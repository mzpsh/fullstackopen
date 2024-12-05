const jwt = require('jsonwebtoken')
const User = require('../models/user')

class MissingIdentityTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = "MissingIdentityTokenError"
  }
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(!authorization) {
    return next(new jwt.JsonWebTokenError('missing token'))
  }

  const token = authorization.replace('Bearer ', '')
  const decoded = jwt.decode(token, process.env.SECRET)
  if(!decoded?.id) {
    return next(new MissingIdentityTokenError('invalid username'))
  }

  request.token = decoded
  next()
}

const userExtractor = async (request, response, next) => {
  const decoded = request.token

  const user = await User.findById(decoded.id)

  if(!user) {
    next(new MissingIdentityTokenError('invalid username'))
  }

  request.tokenUsername = decoded.username;
  request.tokenId = decoded.id;
  request.tokenUser = user;
  next()

}

module.exports = { tokenExtractor, userExtractor }