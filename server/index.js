const Application = require('./app')
const newApp = new Application()
const PORT = process.env.PORT || 4000
newApp.start(PORT)
