const
  dotenv = require('dotenv').load(),
  session = require('express-session'),
  mongoose = require('mongoose'),
  MongoDBStore = require('connect-mongodb-session')(session),
  express = require('express'),
  app = express(),
  fs = require("fs"),
  ejs = require('ejs'),
  multer = require("multer"),
  upload = multer({dest: "./uploads"}),
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
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js')



//envir. port
const
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/the-drop'


//mongoose connection

mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB" + mongoConnectionString)
})
var conn = mongoose.connection;

var gfs;
var Grid = require("gridfs-stream");


Grid.mongo = mongoose.mongo;

conn.once("open", function(){
  gfs = Grid(conn.db);
  app.get("/", function(req,res){
    //renders a multipart/form-data form
    res.render("home");
  });

  //second parameter is multer middleware.
  app.post("/", upload.single("avatar"), function(req, res, next){
    console.log("current user is: " + req.user._id);
    console.log("file name is: " + req.file.originalname);
    //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
    var writestream = gfs.createWriteStream({
      filename: req.user._id + req.file.originalname
    });
    //
    // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
        //update your user
        //uodate your profile pic
        User.update({_id: req.user._id},{_id: req.user._id, profile_pic: req.user._id + req.file.originalname},
        function(err, user){
          console.log("successfully update user pic")
          res.redirect('/profile')
        })
      })})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
  });

  // sends the image we saved by filename.
  app.get("/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
  });

  //delete the image
  app.get("/delete/:filename", function(req, res){
    gfs.exist({filename: req.params.filename}, function(err, found){
      if(err) return res.send("Error occured");
      if(found){
        gfs.remove({filename: req.params.filename}, function(err){
          if(err) return res.send("Error occured");
          res.send("Image deleted!");
        });
      } else{
        res.send("No image found with that title");
      }
    });
  });
});
app.set("views", "./views");


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());


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


//ejs config
app.set('view engine', "ejs")
// app.use(ejsLayouts)





app.use(flash());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  setTimeout(function() {
    next()
  }, 1000)
})

//root route
app.get('/', weatherController.index)

app.get('/search/:searchTerm', weatherController.search)

//route for user profile (defined in users.js)

app.use('/', userRoutes)




app.listen(port, (err) => {
  console.log(err || `Server is running on ${port}`)
});
