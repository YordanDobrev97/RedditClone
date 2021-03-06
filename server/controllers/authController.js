const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('../utils/jwt')

module.exports = {
  register: {
    post: async (ctx, next) => {
      const { username, email, password } = ctx.request.body
      const salt = await bcrypt.genSalt(8)
      const hashPassword = await bcrypt.hash(password, salt)
      const user = new User({
        username,
        email,
        password: hashPassword
      });
      const res = await user.save()
      const token = jwt.generate({id: res._id, username})
      ctx.body = JSON.stringify(token)
      next()
    },
  },
  login: {
    post: async (ctx, next) => {
      const { email, password } = ctx.request.body
      const user = await User.findOne({ email })

      if (!user) {
        return ctx.body = JSON.stringify('User does not exist')
      }
      const passwordRes = await bcrypt.compare(password, user.password)
      if (!passwordRes) {
        return ctx.body = JSON.stringify('The password is wrong')
      }
      
      const token = jwt.generate({id: user._id, username: user.username})
      ctx.body = JSON.stringify(token)
      next()
    }
  }
}