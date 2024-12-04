const express = require('express')
require('express-async-error')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to database')
  })
  .catch(error => {
    console.log('error connecting to database: ', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs/', blogsRouter)
app.use('/api/users/', usersRouter)
app.use('/api/login/', loginRouter)

module.exports = app