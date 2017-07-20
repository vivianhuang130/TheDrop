const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user'),
  FacebookStrategy = require('passport-facebook').Strategy,
  configAuth = require('./auth.js')

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
    console.log(email)

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

passport.use(new FacebookStrategy({
	clientID: configAuth.facebookAuth.clientID,
	clientSecret: configAuth.facebookAuth.clientSecret,
	callbackURL: configAuth.facebookAuth.callbackURL,
	profileFields: configAuth.facebookAuth.profileFields
}, function(token,refreshToken,profile,done){
	User.findOne({'facebook.id': profile.id}, function(err, user){
		if(err) return done(err)
		if(user){
			return done(null, user)
		} else {
			var newUser = new User()
			newUser.facebook.id = profile.id
			newUser.facebook.token = token
			newUser.facebook.name = profile.displayName
			newUser.facebook.email = profile.emails[0].value

			newUser.save(function(err){
				if(err) throw err
				return done(null,newUser)
			})
		}
	})
}))

module.exports = passport
