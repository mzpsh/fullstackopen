const { describe, test, beforeEach, after, afterEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app);

const { userContent } = require('./users_helper')
const User = require('../models/user')

const blogContent = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'google.com',
  likes: 1,
}

const likeLessContent = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'google.com',
}

const noTitleNourl = {
  author: 'Test Author',
  likes: 1,
}

describe('when blog has some posts', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(
      [
        blogContent,
        blogContent,
      ]
    )
  })

  test('should returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
  })
})

describe('post creations', () => {
  beforeEach(async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userContent.password, saltRounds)
    await new User({
      ...userContent,
      passwordHash
    }).save()
  })
  afterEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

  test('have id but not _id and __v', async () => {
    const newBlog = new Blog(blogContent)
    const dbResponse = await newBlog.save()
    const json = dbResponse.toJSON()

    assert.equal(json['_id'], undefined)
    assert.equal(json['__v'], undefined)
    assert.strictEqual(json['id'], dbResponse._id.toString())
  })

  test('successfully created a post using api', async () => {
    const user = await api.post('/api/login')
      .send(userContent)
    
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(blogContent)
    
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
  })

  test('with missing like, successfully created a post using api', async () => {
    const user = await api.post('/api/login')
      .send(userContent)
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(likeLessContent)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
    assert.strictEqual(response.body[0]['likes'], 0)
  })

  test('with missing title or url, return 400', async () => {
    const user = await api.post('/api/login')
      .send(userContent)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(noTitleNourl)
      .expect(400)
  })

  test('creator must not be empty', async () => {
    const user = await api.post('/api/login')
      .send(userContent)

    const result = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(blogContent)
    
    assert.deepEqual(result.body.creator.username, 'gamer')
  })

  test('missing token should return 401', async () => {
    await api.post('/api/blogs')
      .send(blogContent)
      .expect(401)
  })
})

describe('post deletions', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
   
  })
  test('delete single post', async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userContent.password, saltRounds)
    const user = await new User({
      ...userContent,
      passwordHash
    }).save()
   
    const newBlog = await new Blog({
      ...blogContent,
      creator: user.id
    }).save()

    const loggedInUser = await api.post('/api/login')
      .send(userContent)

    await api
      .delete(`/api/blogs/${newBlog.id}`)
      .set('Authorization', `Bearer ${loggedInUser.body.token}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 0)
  })
})

describe('post update operations', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })
  test('update single post', async () => {
    const newBlog = new Blog(blogContent)
    const dbResponse = await newBlog.save();
    const json = dbResponse.toJSON()

    await api
      .put(`/api/blogs/${json.id}`)
      .send({
        ...blogContent,
        likes: 99,
      })
      .expect(200)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0]['likes'], 99)
  })
})

after(async () => {
  await mongoose.connection.close()
})