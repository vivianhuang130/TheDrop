const
  dotenv = require('dotenv').load(),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = 3000,
  weatherController = require('./controllers/weather.js')

mongoose.connect('mongodb://localhost/the-drop', (err) => {
  console.log(err || "Connected to MongoDB.")
})


app.get('/', weatherController.index)
app.get('/search/:searchTerm', weatherController.search)

app.listen(port, (err) => {
  console.log(err || `Server is running on ${port}`)
})
