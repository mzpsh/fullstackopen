const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  if(body.title === undefined || body.url === undefined) {
    response.status(400).end()
  } else {
    const emptyLike = {likes: 0}
    const blog = new Blog({
      ...emptyLike,
      ...request.body,
    })

    const result = await blog.save()
    response.status(201).json(result)
  } 
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlogData = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, newBlogData, { new: true })

  response.json(result)
})

module.exports = blogsRouter