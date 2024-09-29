const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// blogsRouter.get('/', async (request, response) => {
//     const blogs = await Blog.find({})
//     response.json(blogs)
//   })
  
blogsRouter.post('/', (request, response) => {
    // somehow body is undefined???
    console.log(request.body)
    // const blog = new Blog(request.body)
    // const result = blog.save()
    

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
})


// blogsRouter.post('/', async (request, response) => {
//   console.log(request.body)
//   console.log(response.body)

//   const emptyLike = {likes: 0}
//   const blog = new Blog({
//     ...emptyLike,
//     ...request.body,
//   })

//   // if(!Object.hasOwn(request.body, 'likes')) {
//   //   blog = new Blog({
//   //     ...response.body,
//   //     likes: 0,
//   //   })
//   // } else {
//   //   blog = new Blog(request.body)
//   // }
  
//   // const result = await blog.save()
//   // response.status(201).json(result)
// })

module.exports = blogsRouter