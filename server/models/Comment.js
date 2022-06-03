const mongoose = require('../config/index')

const CommentSchema = mongoose.Schema({
  content: { type: String },
  votes: { type: Number, min: 0 }
})

module.exports = mongoose.model('Comment', CommentSchema)