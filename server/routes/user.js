const Router = require('koa-router')
const controller = require('../controllers/userController')
const router = new Router({
  prefix: '/comminity'
})

router.post('/create', controller.comminity.create)

module.exports = router