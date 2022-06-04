const mongoose = require('../config/index')

const PostSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  votes: { type: Number, min: 0 },
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
})

module.exports = mongoose.model('Post', PostSchema)