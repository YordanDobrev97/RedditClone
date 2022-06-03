const mongoose = require('../config/index')

const UserSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('User', UserSchema)