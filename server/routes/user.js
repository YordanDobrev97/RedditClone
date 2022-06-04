const Router = require('koa-router')
const controller = require('../controllers/userController')
const router = new Router({
  prefix: '/'
})

router.get('communities', controller.community.getAll)
router.post('community/create', controller.community.create)

router.get('posts', controller.post.getAll)
router.get('posts/:id', controller.post.getById)
router.post('posts/create', controller.post.create)

router.get('comments', controller.comment.getAll)
router.post('comment/create', controller.comment.create)
router.put('comment/upVote/:id', controller.comment.upVote)
router.put('comment/downVote/:id', controller.comment.downVote)
router.delete('comment/:postId/:commentId', controller.comment.remove)

module.exports = router