const mongoose = require('../config/index')

const CommunitySchema = mongoose.Schema({
  title: { type: String },
  posts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ]
})

module.exports = mongoose.model('Community', CommunitySchema)