const Router = require('koa-router')
const controller = require('../controllers/commentController')
const router = new Router({
  prefix: '/'
})

router.get('comments/:postId', controller.get.getByPost)
router.post('comment/create', controller.post.create)
router.put('comment/upVote/:id', controller.put.upVote)
router.put('comment/downVote/:id', controller.put.downVote)

module.exports = router