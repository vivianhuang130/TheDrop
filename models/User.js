const mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  name: {type: String, required:true},
  local: {
    password: String,
    email: String,
  },
  profile_pic: {type: String},
  location: {type: String},
  bio: {type:String},
  favorite: {type:String},
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

User.methods.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', userSchema)
module.exports = User
