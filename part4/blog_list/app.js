const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to database')
  })
  .catch(error => {
    console.log('error connecting to database: ', error.message)
  })

app.use('/api/blogs/', blogsRouter)

app.use(cors())
app.use(express.json())

module.exports = app