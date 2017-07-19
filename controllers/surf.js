const request = require('request')

module.exports = {

  index: (req, res) => {
    res.render('show')
  },

  show: (req, res) => {
    // res.render('show')
    var id = req.params.id
    var surfApiUrl = 'http://api.surfline.com/v1/forecasts'
    //<spot_id>?resources=&days=&getAllSpots=&units=&usenearshore=&interpolate=&showOptimal=&callback=
    var surfRequestUrl = `${surfApiUrl}/${id}?surf,wind,tide=&3=&false=&e=&true=&true=&true=&callback=`

    console.log(surfRequestUrl)

    request.get(surfRequestUrl, (err, response, body) => {
      res.json(JSON.parse(body))
    })
  }
}
