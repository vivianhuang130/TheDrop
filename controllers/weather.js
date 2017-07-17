const request = require('request')

module.exports = {

  index: (req, res) => {
    res.render('search')
  },

  search: (req, res) => {
    var searchTerm = req.params.searchTerm
    var apiUrl = 'http://api.wunderground.com/api/'
    // YOUR_API_KEY/conditions/q/CA/THE_DESIRED_CITY.json
    var apiKey = process.env.WEATHER_API_KEY
    var requestUrl = `${apiUrl}${apiKey}/conditions/q/CA/${searchTerm}.json`

    request.get(requestUrl, (err, response, body) => {
      res.json(JSON.parse(body))
    })
  }

}
