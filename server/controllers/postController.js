const Post = require('../models/Post')
const Community = require('../models/Community')
const Comment = require('../models/Comment')

module.exports = {
  get: {
    getById: async(ctx, next) => {
      const { id } = ctx.request.params
      const post = await Post.findOne({ _id: id })
      const postComments = await Comment.find()
        .where('_id').in(post.comments).exec()
      post.comments = postComments
      ctx.body = JSON.stringify(post)
      next() 
    },
    getAll: async(ctx, next) => {
      const posts = await Post.find()
      ctx.body = JSON.stringify(posts)
      next()
    },
  },
  post: {
    create: async (ctx, next) => {
      const { communityId, title, content } = ctx.request.body
      try {
        const communityRes = await Community.findOne({ _id: communityId })
        if (!communityRes) {
          return (ctx.body = 'community does not exist')
        }

        const post = new Post({ title, content, votes: 0 })
        const postResponse = await post.save()

        communityRes.posts.push(postResponse._id)
        await communityRes.save()
        ctx.body = JSON.stringify(post)
        next();
      } catch (error) {
        return (ctx.body = 'community Id invalid')
      }
    },
  },
  put: {
    upVote: async(ctx, next) => {
      try {
        const { id } = ctx.params
        const post = await Post.findOne({ _id: id })
        if (!post) {
          return (ctx.body = 'Post does not exist')
        }

        post.votes += 1
        await post.save()
        ctx.body = post
        next();
      } catch (error) {
        ctx.body = 'Post invalid!'
      }
    },
    downVote: async(ctx, next) => {
      try {
        const { id } = ctx.params
        const post = await Post.findOne({ _id: id })
        if (!post) {
          return (ctx.body = 'Post does not exist')
        }

        post.votes -= 1
        await post.save()
        ctx.body = post
        next();
      } catch (error) {
        ctx.body = 'Post invalid'
      }
    }
  }
}