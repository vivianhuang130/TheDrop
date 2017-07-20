const
  mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
  local : {
    name: String,
    password: String,
    email: String,
  },
<<<<<<< HEAD
  facebook: {
		id: String,
		name: String,
		token: String,
		email: String
	},
=======

>>>>>>> 45f9009c68fcdcb6c0bd35722082542405b2472a
  profile_pic: {type: String},
  location: {type: String},
  bio: {type:String},
  favorites: {type:String},
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema)
module.exports = User
