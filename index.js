const
  dotenv = require('dotenv').load(),
  session = require('express-session'),
  mongoose = require('mongoose'),
  MongoDBStore = require('connect-mongodb-session')(session),
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  flash = require('connect-flash'),
  port = 3000,
  User = require('./models/user'),
  Comment = require('./models/Comment.js'),
  SurfLocation = require('./models/SurfLocation.js'),
  weatherController = require('./controllers/weather.js'),
  surfController = require('./controllers/surf.js'),
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js')


//envir. port
const
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/passport-authentication'

//mongoose connection

mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB (passport-authentication)")
})

require('./config/passport');
//store session info as 'sessions' collection in mongoose

const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
});


//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: 'THE-DROP-PROJECT-3',
  cookie:{maxAge : 60000000},
  resave: true,
  saveUninitialized: false,
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user);
	app.locals.currentUser = req.user // currentUser now available in ALL views
	app.locals.loggedIn = !!req.user // a boolean loggedIn now available in ALL views

	next()
})
// require('./config/passport')(passport);

//ejs config
app.set('view engine', "ejs")
// app.use(ejsLayouts)


app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  setTimeout(function() {
    next()
  }, 1000)
})

//root route
app.get('/', weatherController.index)

app.get('/search/:searchTerm', weatherController.search)

// app.get('/index', surfController.index)
// app.get('/show/:id', surfController.show)

//route for user profile (defined in users.js)

app.use('/', userRoutes)

/////

app.listen(port, (err) => {
  console.log(err || `Server is running on ${port}`)
});
