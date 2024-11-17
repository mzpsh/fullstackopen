const userContent = {
  username: 'gamer',
  password: 'gamer123',
  name: 'Pro Gamer'
}

const nonUniqueUsername = {
  username: 'gamer',
  password: 'hehe312',
  name: 'Haxor Gamer'
}

const missingUsername = {
  password: 'asdadad',
  name: 'Let Me Cook'
}

const missingPassword = {
  username: 'asdadad',
  name: 'Let Me Cook'
}

const shortUsername = {
  username: 'aa',
  password: 'dddd',
  name: 'Let Me Cook'
}

const shortPassword = {
  username: 'aaaa',
  password: 'dd',
  name: 'Let Me Cook'
}

module.exports = {
  userContent,
  nonUniqueUsername,
  missingUsername,
  missingPassword,
  shortUsername,
  shortPassword,
}