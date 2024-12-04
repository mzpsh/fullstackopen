const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  
  const user = await User.findOne({ username })
  if (!user) {
    return response.status(401).json({
      error: 'Username is invalid'
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
  if(!isPasswordCorrect || !password) {
    return response.status(401).json({
      error: 'Password is incorrect'
    })
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id
  }, process.env.SECRET, { expiresIn: 60 * 60 })

  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name
    })
  

})

module.exports = loginRouter