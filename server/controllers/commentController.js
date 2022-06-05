const Comment = require('../models/Comment')
const Post = require('../models/Post')

module.exports = {
  get: {
    getByPost: async (ctx, next) => {
      const { postId } = ctx.request.body
      const post = await Post.findOne({ _id: postId })

      if (!post) {
        return ctx.body = 'Post does not exist'
      }

      const postComments = await Comment.find()
        .where('_id').in(post.comments).exec()
      console.log(postComments)
      post.comments = postComments

      ctx.body = post
      next()
    },
  },
  post: {
    create: async (ctx, next) => {
      const { postId, content } = ctx.request.body
      if (!content) {
        return (ctx.body = 'The content is invalid')
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
        
        ctx.body = JSON.stringify(post);
        next();
      } catch (error) {
      }
    },
  },
  put: {
    upVote: async (ctx, next) => {
      try {
        const { id } = ctx.params
        const comment = await Comment.findOne({ _id: id })
        if (!comment) {
          return (ctx.body = 'Comment does not exist')
        }

        comment.votes += 1
        await comment.save()
        ctx.body = comment
        next();
      } catch (error) {
        ctx.body = 'Comment Id invalid'
      }
    },
    downVote: async (ctx, next) => {
      try {
        const { id } = ctx.params
        const comment = await Comment.findOne({ _id: id })
        if (!comment) {
          return (ctx.body = 'Comment does not exist')
        }

        comment.votes -= 1
        await comment.save()
        ctx.body = comment
        next()
      } catch (error) {
        ctx.body = 'Comment Id invalid'
      }
    },
  }
}