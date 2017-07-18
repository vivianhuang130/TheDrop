const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user')

  var
  	passport = require('passport'),
  	LocalStrategy = require('passport-local').Strategy,
  	FacebookStrategy = require('passport-facebook').Strategy,
  	configAuth = require('./auth.js')

  var User = require('../models/User.js')


  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback){
    User.findById(id, function(err, user){
      callback(err, user)
    })
  })

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
  	usernameField: 'email',
  	passwordField: 'password',
  	passReqToCallback: true
  }, (req, email, password, done) => {
  	User.findOne({'local.email': email}, (err, user) => {
  		if(err) return done(err)
  		if(user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))
  		var newUser = new User()
           newUser.local.name = req.body.name
  		newUser.local.email = email
  		newUser.local.password = newUser.generateHash(password)
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
		if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password.'))
		return done(null, user)
	})
}))


module.exports = passport
