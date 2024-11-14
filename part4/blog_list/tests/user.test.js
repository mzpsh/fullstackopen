const { describe, test, before, after } = require('node:test')
const assert = require('assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const userContent = {
  username: 'gamer',
  password: 'gamer123',
  name: 'Pro Gamer'
}



describe('user creations', () => {
  before(async () => {
    await User.deleteMany({})
  })
  
  test('return name, username, and id but not the hash', async () => {
    const result = await api.post('/api/users')
      .send(userContent)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      console.log(result.body)

      assert.ok(result.body['username'])
      assert.ok(result.body['name'])
      assert.ok(result.body['id'])
    })

  test('return list of users and with count', async () => {
    const result = await api.get('/api/users')
      .send()
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.length, 1)
  })
    
})

after(async () => {
  await mongoose.connection.close()
})