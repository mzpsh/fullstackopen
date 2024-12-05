const { describe, test, before, beforeEach, after } = require('node:test')
const assert = require('assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const {
  userContent,
  // nonUniqueUsername,
  missingUsername,
  missingPassword,
  shortUsername,
  shortPassword,
} = require('./users_helper')

describe('user creation rules', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('throw error for username/password requirement', async () => {
    const resultMissingUsername = await api.post('/api/users')
      .send(missingUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(resultMissingUsername.body['error'], 'Username is required')

    const resultMissingPassword = await api.post('/api/users')
      .send(missingPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(resultMissingPassword.body['error'], 'Password is required')
  })

  test('throw error for insufficient username/password length', async () => {
    const resultShortUsername = await api.post('/api/users')
      .send(shortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(resultShortUsername.body['error'], 'Username needs to be atleast 3 character long')

    const resultShortPassword = await api.post('/api/users')
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(resultShortPassword.body['error'], 'Password needs to be atleast 3 character long')
  })

  test('throw error if existing username exist', async () => {
    await api.post('/api/users/').send(userContent)

    const result = await api.post('/api/users')
      .send(userContent)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body['error'], 'Username exist')
  })
  
})

describe('user creations', () => {
  before(async () => {
    await User.deleteMany({})
  })
  
  test('return name, username, and id but not the hash', async () => {
    const result = await api.post('/api/users')
      .send(userContent)
      .expect(201)
      .expect('Content-Type', /application\/json/)

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
  const result = await api.get('/api/users')
    .send()
    .expect(200)
    .expect('Content-Type', /application\/json/)
  console.log('User count after this test: ')
  console.log(result.body.length)
  await mongoose.connection.close()
})