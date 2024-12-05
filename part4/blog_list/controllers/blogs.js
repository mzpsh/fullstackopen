const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator')
  response.json(blogs)
})
  
blogsRouter.post('/', middleware.tokenExtractor)
blogsRouter.post('/', middleware.userExtractor)
blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  if(body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  } 

  const emptyLike = { likes: 0 }
  const blog = new Blog({
    ...emptyLike,
    ...request.body,
    creator: request.tokenId
  })

  const result = await blog.save()
  const populatedBlog = await result.populate('creator')

  await User.findByIdAndUpdate(request.tokenId, {
    posts: [
      ...request.tokenUser.posts,
      result.id,
    ]
  })

  response.status(201).json(populatedBlog)
  
})

blogsRouter.delete('/:id', middleware.tokenExtractor)
blogsRouter.delete('/:id', middleware.userExtractor)
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(blog.creator.toString() !== request.tokenId) {
    return response.status(401).json({ error: "user unauthorized to delete this post" })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlogData = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, newBlogData, { new: true })

  response.json(result)
})

module.exports = blogsRouter