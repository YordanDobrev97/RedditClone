const Comminity = require('../models/Comminity')
const User = require('../models/User')
const Post = require('../models/Post')
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
  },
  post: {
    create: async (ctx, next) => {
      const { comminityId, title, content } = ctx.request.body
      try {
        const comminityRes = await Comminity.findOne({ _id: comminityId })
        if (!comminityRes) {
          return ctx.body = 'Comminity does not exist'
        }

        const post = new Post({ title, content })
        const postResponse = await post.save()

        comminityRes.posts.push(postResponse._id)
        await comminityRes.save()
        ctx.body = comminityRes
        next()
      } catch (error) {
        return ctx.body = 'ComminityId invalid'
      }
    }
  }
}