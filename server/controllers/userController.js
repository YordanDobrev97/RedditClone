const Comminity = require('../models/Comminity')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
  comminity: {
    create: async (ctx, next) => {
      const { title } = ctx.request.body
      const token = ctx.request.headers['token']
      const userToken = jwt.decode(token)
      
      const comminity = new Comminity({ title })
      const res = await comminity.save()
      
      const user = await User.findOne({ _id: userToken?.userID })
 
      if (!user) {
        return ctx.body = 'user does not exist'
      }
      
      user.communiticies.push(res._id)
      await user.save()
      ctx.body = user
      next()
    }
  }
}