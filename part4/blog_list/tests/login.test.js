const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const User = require('../models/user')
const { userContent } = require('./users_helper')

const api = supertest(app)

describe('authentication process', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userContent.password, saltRounds)
    await new User({
      ...userContent,
      passwordHash
    }).save()
  })

  test('with invalid username', async () => {
    const result = await api.post('/api/login')
      .send({
        username: 'fakegamer'
      })
      .expect(401)

    assert.equal('Username is invalid', result.body.error)
  })

  test('with invalid password', async () => {
    const result = await api.post('/api/login')
      .send({
        username: 'gamer',
        password: 'not apassword obviously'
      })
      .expect(401)
      
    assert.equal('Password is incorrect', result.body.error)
  })

  test('with correct credentials', async () => {
    const result = await api.post('/api/login')
      .send({
        username: 'gamer',
        password: 'gamer123'
      })
      .expect(200)
      
    const body = result.body
    assert.equal('gamer', body.username)
    assert.equal('Pro Gamer', body.name)
  })

})

after(async () => {

  await mongoose.connection.close()
})