const mongoose = require('../config/index')

const UserSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  username: { type: String },
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }]
})

module.exports = mongoose.model('User', UserSchema)