const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
  register: {
    post: async (ctx, next) => {
      const { email, password } = ctx.request.body
      const salt = await bcrypt.genSalt(8)
      const hashPassword = await bcrypt.hash(password, salt)
      const user = new User({
        email,
        password: hashPassword
      });
      const res = await user.save()
      ctx.body = res
      next()
    }
  }
}