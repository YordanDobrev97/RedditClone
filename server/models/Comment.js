const mongoose = require('../config/index')

const CommentSchema = mongoose.Schema({
  content: { type: String },
  votes: { type: Number }
})

module.exports = mongoose.model('Comment', CommentSchema)