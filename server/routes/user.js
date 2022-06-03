const Router = require('koa-router')
const controller = require('../controllers/userController')
const router = new Router({
  prefix: '/'
})

router.post('comminity/create', controller.comminity.create)
router.post('posts/create', controller.post.create)

module.exports = router