console.log('app.js is loaded in the client....')

var cityInput = $('#city-input')
var searchButton = $('#search-button')
var loading = '<h3>loading...</h3>'

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
    var cityLat = d.current_observation.display_location.latitude
    var cityLong = d.current_observation.display_location.longitude
    $('#results').append(`${city}: ${temp}<br>`)
    $('#results').append(`Lat: ${cityLat} Long: ${cityLong}`)
    map.addMarker({
      lat: `${cityLat}`,
      lng: `${cityLong}`,
      title: `${city}`
    });
    $('h3').hide(loading)
  }

  $('#results').append(loading)
  $.ajax(requestSettings).done(cb)

})
