const Router = require('koa-router')
const controller = require('../controllers/communityController')
const router = new Router({
  prefix: '/'
})

router.get('communities', controller.get.getAll)
router.get('community/:name', controller.get.getByName)

router.post('community/create', controller.post.create)

module.exports = router