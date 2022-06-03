const Comminity = require("../models/Comminity")
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const jwt = require("jsonwebtoken")

module.exports = {
  comminity: {
    create: async (ctx, next) => {
      const { title } = ctx.request.body
      const token = ctx.request.headers["token"]
      const userToken = jwt.decode(token)

      const comminity = new Comminity({ title })
      const res = await comminity.save()
      const user = await User.findOne({ _id: userToken?.userID })

      if (!user) {
        return (ctx.body = "user does not exist")
      }

      user.communiticies.push(res._id)
      await user.save()
      ctx.body = user
      next()
    },
  },
  post: {
    create: async (ctx, next) => {
      const { comminityId, title, content } = ctx.request.body
      try {
        const comminityRes = await Comminity.findOne({ _id: comminityId })
        if (!comminityRes) {
          return (ctx.body = "Comminity does not exist")
        }

        const post = new Post({ title, content })
        const postResponse = await post.save()

        comminityRes.posts.push(postResponse._id)
        await comminityRes.save()
        ctx.body = comminityRes
        next();
      } catch (error) {
        return (ctx.body = "ComminityId invalid")
      }
    },
  },
  comment: {
    getAll: async (ctx, next) => {
      const comments = await Comment.find()
      ctx.body = comments
      next()
    },
    create: async (ctx, next) => {
      const { postId, content } = ctx.request.body
      if (!content) {
        return (ctx.body = "The content is invalid")
      }

      try {
        const post = await Post.findOne({ _id: postId })
        if (!post) {
          return ctx.body = 'The post must exist to add a comment'
        }

        const comment = new Comment({ content, votes: 0 })
        const commentResponse = await comment.save()
        post.comments.push(commentResponse._id)
        await post.save()
        
        ctx.body = commentResponse;
        next();
      } catch (error) {
        
      }
    },
    upVote: async (ctx, next) => {
      try {
        const { id } = ctx.params
        const comment = await Comment.findOne({ _id: id })

        if (!comment) {
          return (ctx.body = "Comment does not exist")
        }

        comment.votes += 1
        await comment.save()
        ctx.body = comment
        next();
      } catch (error) {
        ctx.body = "Comment Id invalid"
      }
    },
    downVote: async (ctx, next) => {
      try {
        const { id } = ctx.params
        const comment = await Comment.findOne({ _id: id })

        if (!comment) {
          return (ctx.body = "Comment does not exist")
        }

        comment.votes -= 1
        await comment.save()
        ctx.body = comment
        next()
      } catch (error) {
        ctx.body = "Comment Id invalid"
      }
    },
    remove: async (ctx, next) => {
      try {
        const { id } = ctx.params
        const comment = await Comment.deleteOne({ _id: id })

        if (!comment) {
          return (ctx.body = "Comment does not exist")
        }

        ctx.body = 'Deleted'
        next()
      } catch (error) {
        ctx.body = 'CommentId is invalid'
      }
    },
  },
};
