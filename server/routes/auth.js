const Router = require('koa-router')
const controller = require('../controllers/authController')

const router = new Router({
  prefix: '/auth'
})


router.post('/login', controller.login.post)
router.post('/register', controller.register.post)

module.exports = router