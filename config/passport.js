const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user')

//console.log(User)

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      callback(err, user)
    })
  })

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
  	usernameField: 'email',
  	passwordField: 'password',
  	passReqToCallback: true
  }, (req, email, password, done) => {
    console.log("let us find the user")
    console.log(local.email)
    // process.nextTick(function(){
      User.findOne({'local.email': email}, (err, user) => {
    		if(err)  {
          console.log("there was an error" + err)
          return done(err)
        }
    		if(user)  {
          console.log("there was a user" + user)
          return done(null, false, req.flash('signupMessage', 'That email is taken.'))
        }
        console.log("user not found")
    		var newUser = new User()
        newUser.local.name = req.body.name
    		newUser.local.email = email
    		newUser.local.password = newUser.generateHash(password)
        console.log("about to save" + newUser)
    		newUser.save((err) => {
    			if(err) throw err
    			return done(null, newUser, null)
    		})
    	})


  }))

  passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	User.findOne({'local.email': email}, (err, user) => {
		if(err) return done(err)
		if(!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
    console.log("user found in login valid password?" + user.validPassword(password))

		if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password.'))
		return done(null, user)
	})
}))


module.exports = passport
