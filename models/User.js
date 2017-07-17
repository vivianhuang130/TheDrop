const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type:String, required:true, unique:true},
  profile_pic: {type: String},
  location: {type: String},
  bio: {type:String},
  favorite: {type:String},
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

const User = mongoose.model('User', userSchema)
module.exports = User
