const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
  body: {type:String},
  surfLocation: [{type: mongoose.Schema.Types.ObjectId, ref: 'SurfLocation'}]
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
