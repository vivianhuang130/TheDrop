const
  dotenv = require('dotenv').load(),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  session = require('express-session'),
  flash = require('flash'),
  port = 3000,
  User = require('./models/User.js'),
  Comment = require('./models/Comment.js'),
  SurfLocation = require('./models/SurfLocation.js')
mongoose.connect('mongodb://localhost/the-drop', (err) => {
  console.log(err || "Connected to MongoDB.")
})
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'THE-DROP-PROJECT-3' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);
///
app.get('/', (req, res) => {
  res.json('root route')
})
app.listen(port, function(err) {
  console.log(err || `Server is running on ${port}`)
})
