const Community = require('../models/Community')
const User = require('../models/User')
const Post = require('../models/Post')

const jwt = require('jsonwebtoken')

module.exports = {
  post: {
    create: async (ctx, next) => {
      const { title } = ctx.request.body
      const token = ctx.request.headers['token']
      const userToken = jwt.decode(token)
      
      const community = new Community({ title })
      const res = await community.save()
      const user = await User.findOne({ _id: userToken.userID.id })
      if (!user) {
        return (ctx.body = 'user does not exist')
      }

      user.communities.push(res._id)
      await user.save()
      ctx.body = JSON.stringify(community)
      next()
    },
  },
  get: {
    getAll: async(ctx, next) => {
      const communities = await Community.find({})
      ctx.body = JSON.stringify(communities)
      next()
    },
    getByName: async (ctx, next) => {
      const { name } = ctx.request.params
      const community = await Community.findOne({ title: name })

      const communityPosts = await Post.find()
        .where('_id').in(community.posts).exec()
      community.posts = communityPosts
      
      ctx.body = JSON.stringify(community)
      next()
    }
  }
}