const mongoose = require('../config/index')

const PostSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
})

module.exports = mongoose.model('Post', PostSchema)