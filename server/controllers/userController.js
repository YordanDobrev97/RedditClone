const Community = require("../models/Community")
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const jwt = require("jsonwebtoken")

module.exports = {
  community: {
    create: async (ctx, next) => {
      const { title } = ctx.request.body
      const token = ctx.request.headers["token"]
      const userToken = jwt.decode(token)

      const community = new Community({ title })
      const res = await community.save()
      const user = await User.findOne({ _id: userToken?.userID })

      if (!user) {
        return (ctx.body = "user does not exist")
      }

      user.communities.push(res._id)
      await user.save()
      ctx.body = JSON.stringify(community)
      next()
    },
  },
  post: {
    create: async (ctx, next) => {
      const { communityId, title, content } = ctx.request.body
      try {
        const communityRes = await Community.findOne({ _id: communityId })
        if (!communityRes) {
          return (ctx.body = "community does not exist")
        }

        const post = new Post({ title, content })
        const postResponse = await post.save()

        communityRes.posts.push(postResponse._id)
        await communityRes.save()
        ctx.body = JSON.stringify(post)
        next();
      } catch (error) {
        return (ctx.body = "communityId invalid")
      }
    },
    getById: async(ctx, next) => {
      const { id } = ctx.request.params
      const post = await Post.findOne({ _id: id })
      ctx.body = JSON.stringify(post)
      next() 
    }
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
        const { postId, commentId } = ctx.params
        const comment = await Comment.deleteOne({ _id: commentId })
        if (!comment) {
          return (ctx.body = "Comment does not exist")
        }

        const post = await Post.findOne({ _id: postId })
        if (!post) {
          return ctx.body = 'This post does not exist'
        }

        post.comments = post.comments.filter(c => c._id.toString() !== commentId)
        await post.save()
        ctx.body = 'Deleted'
        next()
      } catch (error) {
        ctx.body = 'CommentId is invalid'
      }
    },
  },
};
