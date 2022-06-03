const Router = require('koa-router')
const controller = require('../controllers/userController')
const router = new Router({
  prefix: '/'
})

router.post('comminity/create', controller.comminity.create)

router.post('posts/create', controller.post.create)

router.get('comments', controller.comment.getAll)
router.post('comment/create', controller.comment.create)
router.put('comment/upVote/:id', controller.comment.upVote)
router.put('comment/downVote/:id', controller.comment.downVote)
router.delete('comment/:id', controller.comment.remove)

module.exports = router