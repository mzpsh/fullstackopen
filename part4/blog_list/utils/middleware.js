const jwt = require('jsonwebtoken')

class MissingIdentityTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = "MissingIdentityTokenError"
  }
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization.replace('Bearer ', '')

  const decoded = jwt.decode(token, process.env.SECRET)
  
  if(!decoded?.id) {
    throw new MissingIdentityTokenError('invalid username')
  }

  request.tokenUsername = decoded.username;
  next()

}

module.exports = { tokenExtractor }