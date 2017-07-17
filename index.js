const
  dotenv = require('dotenv').load(),
  express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  session= require ('express-session'),
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
=======
  SurfLocation = require('./models/SurfLocation.js'),
  weatherController = require('./controllers/weather.js')

mongoose.connect('mongodb://localhost/the-drop', (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.set('view engine', "ejs")

>>>>>>> ecc1d054579c5248ed0eec90e4113a61e0323e73
app.use(session({ secret: 'THE-DROP-PROJECT-3' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
<<<<<<< HEAD
require('./config/passport')(passport);
///
app.get('/', (req, res) => {
  res.json('root route')
})
app.listen(port, function(err) {
=======

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./config/passport')(passport);

app.get('/', weatherController.index)
app.get('/search/:searchTerm', weatherController.search)

app.listen(port, (err) => {
>>>>>>> ecc1d054579c5248ed0eec90e4113a61e0323e73
  console.log(err || `Server is running on ${port}`)
})
