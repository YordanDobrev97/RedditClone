const Router = require('koa-router')
const controllers = require('../controllers/authController')

const router = new Router({
  prefix: '/auth'
})

router.get('/login', async (ctx, next) => {
  ctx.body = 'Login'
  next()
})

router.post('/register', controllers.register.post)

module.exports = router