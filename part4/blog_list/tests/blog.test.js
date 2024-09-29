const { describe, test, after } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app);

const blogContent = {
    title: 'Test Title',
    author: 'Test titl',
    url: 'google.com',
    likes: 1,
}

describe('blogs', () => {

    test('should returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 0)
    })

    test('have id but not _id and __v', async () => {
        const newBlog = new Blog(blogContent)
        const dbResponse = await newBlog.save();
        const json = dbResponse.toJSON()

        assert.equal(json['_id'], undefined)
        assert.equal(json['__v'], undefined)
        assert.strictEqual(json['id'], dbResponse._id.toString())

        await newBlog.deleteOne()
    })

})



after(async () => {
    await mongoose.connection.close()
})