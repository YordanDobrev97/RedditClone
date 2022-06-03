const mongoose = require('../config/index')

const UserSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  communiticies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comminity' }]
})

module.exports = mongoose.model('User', UserSchema)