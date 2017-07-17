console.log('app.js is loaded in the client....')

var cityInput = $('#city-input')
var searchButton = $('#search-button')

searchButton.on('click', function() {

  console.log('clicked')
  var requestSettings = {
    method: 'get',
    url: '/search/' + cityInput.val()
  }

  function cb(d) {
    $('#results').empty()
    console.log(d)
    var temp = d.current_observation.feelslike_string
    var city = d.current_observation.display_location.city
    $('#results').append(`${city}: ${temp}<br>`)
  }

  $.ajax(requestSettings).done(cb)

})
