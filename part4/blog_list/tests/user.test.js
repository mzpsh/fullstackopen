const { describe, test, before, beforeEach, after } = require('node:test')
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

const nonUniqueUsername = {
  username: 'gamer',
  password: 'hehe312',
  name: 'Haxor Gamer'
}

const missingUsername = {
  password: 'asdadad',
  name: 'Let Me Cook'
}

const missingPassword = {
  username: 'asdadad',
  name: 'Let Me Cook'
}

const shortUsername = {
  username: 'aa',
  password: 'dddd',
  name: 'Let Me Cook'
}

const shortPassword = {
  username: 'aaaa',
  password: 'dd',
  name: 'Let Me Cook'
}

describe.only('user creation rules', () => {
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
  await mongoose.connection.close()
})