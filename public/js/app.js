console.log('app.js is loaded in the client....')

// ------ VARIABLES ------ //
var cityInput = $('#city-input')
var searchButton = $('#search-button')
var loading = '<h3>loading...</h3>'

var surfSpots = [
  {name: 'Rincon, Santa Barbara', lat: 34.224096, long: -119.285572},
  {name: 'Manhattan Beach, Los Angeles', lat: 33.8837, long: -118.414},
  {name: 'Malibu, Los Angeles', lat: 34.013332, long: -118.464713},
  {name: 'Zuma Beach, Los Angeles', lat: 34.011849, long: -118.495228},
  {name: 'Silver Strand, Oxnard', lat: 34.091160, long: -119.121102},
  {name: 'Venice Beach, Los Angeles', lat: 33.585417, long: -118.281741},
  {name: 'Port Hueneme Beach, Oxnard', lat: 34.083381, long: -119.114732},
  {name: 'Yerba Buena Beach, Ventura', lat: 34.030603, long: -118.573835},
  {name: 'Staircase Beach, Ventura', lat: 34.024740, long: -118.565140},
  {name: 'Hermosa Beach, Los Angeles', lat: 33.513852, long: -118.241018},
  {name: '36th Street, Newport', lat: 33.6147, long: -117.9379},
  {name: '64th Place, Newport', lat: 33.7464, long: -118.123}
]

locationList = $('#location-list')
surfLocations = $('#surf-locations')

// ------ FUNCTIONS ------ //
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
    // $('#results').append(`Lat: ${cityLat} Long: ${cityLong}`)
    map.addMarker({
      lat: `${cityLat}`,
      lng: `${cityLong}`,
      title: `${city}`,
      size: 'small'
    });
    $('h3').hide(loading)
  }

  $('#results').append(loading)
  $.ajax(requestSettings).done(cb)
})

function populateSpots() {
  for (var i=0; i<surfSpots.length; i++) {
    var theLi = $('<li>')
    var name = surfSpots[i].name
    console.log(name);
    theLi.html(name)
    surfLocations.append(theLi)
  }
  console.log(name)
}
populateSpots()
