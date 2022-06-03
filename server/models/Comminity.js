const mongoose = require('../config/index')

const ComminitySchema = mongoose.Schema({
  title: { type: String },
  posts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ]
})

module.exports = mongoose.model('Comminity', ComminitySchema)