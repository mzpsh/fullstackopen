const jwt = require('jsonwebtoken')
const User = require('../models/user')

class MissingIdentityTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = "MissingIdentityTokenError"
  }
}

const tokenUserExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization.replace('Bearer ', '')

  const decoded = jwt.decode(token, process.env.SECRET)
  const user = await User.findById(decoded.id)

  if(!decoded?.id || !user) {
    next(new MissingIdentityTokenError('invalid username'))
  }

  request.tokenUsername = decoded.username;
  request.tokenId = decoded.id;
  request.tokenUser = user;
  next()

}

module.exports = { tokenUserExtractor }