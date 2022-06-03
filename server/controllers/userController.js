const Comminity = require('../models/Comminity')

module.exports = {
  comminity: {
    create: async (ctx, next) => {
      const { title } = ctx.request.body
      const comminity = new Comminity({
        title
      })
      const res = await comminity.save()
      ctx.body = res
      next()
    }
  }
}