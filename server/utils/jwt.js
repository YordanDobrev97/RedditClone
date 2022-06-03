const jwt = require('jsonwebtoken')
const privateKey = 'my-private-key'

const generate = (id) => {
  return jwt.sign(
      {
          userID: id,
      },
      privateKey
  )
}

module.exports = {
  generate
}