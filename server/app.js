const Koa = require('koa')
const koaBody = require('koa-body')

const auth = require('./routes/auth')
const app = new Koa()
require('./config/index')

class App {
  constructor() {
    this.DEFAULT_PORT = 4000
    app.use(koaBody())
  }
  async start(port = this.DEFAULT_PORT) {
    app.listen(port, () => console.log(`Server running at ${port} PORT!`))
    await this.addRoutes()
  }
  async addRoutes() {
    app.use(auth.routes())
  }

}

module.exports = App