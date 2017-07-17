const mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema({
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

module.exports = User
