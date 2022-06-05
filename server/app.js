const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const auth = require('./routes/auth')
const community = require('./routes/community')
const post = require('./routes/post')
const comment = require('./routes/comment')

const app = new Koa()
require('./config/index')

class App {
  constructor() {
    this.DEFAULT_PORT = 4000
    app.use(koaBody())
    app.use(cors())
  }
  async start(port = this.DEFAULT_PORT) {
    app.listen(port, () => console.log(`Server running at ${port} PORT!`))
    await this.addRoutes()
  }
  async addRoutes() {
    app.use(auth.routes())
    app.use(community.routes())
    app.use(post.routes())
    app.use(comment.routes())
  }
}

module.exports = App