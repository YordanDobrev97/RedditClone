const Router = require('koa-router')
const controller = require('../controllers/postController')
const router = new Router({
  prefix: '/'
})
router.get('', (ctx, next) => {
  ctx.body = JSON.stringify('Welcome to reddit api')
  next()
})

router.get('posts', controller.get.getAll)
router.get('posts/:id', controller.get.getById)
router.post('posts/create', controller.post.create)
router.put('post/upVote/:id', controller.put.upVote)
router.put('post/downVote/:id', controller.put.downVote)

module.exports = router