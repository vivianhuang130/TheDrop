console.log('app.js is loaded in the client....')

// ------ VARIABLES ------ //
var cityInput = $('#city-input')
var searchButton = $('#search-button')
var loading = '<h3>loading...</h3>'

var surfSpots = [
  {name: 'Rincon Beach', city: 'Santa Barbara', spotId: 4197},
  {name: 'Manhattan Beach', city: 'Manhattan Beach', spotId: 4901},
  {name: 'Malibu Beach', city: 'Malibu', spotId: 4209},
  {name: 'Zuma Beach', city: 'Malibu', spotId: 4949},
  {name: 'Venice Beach', city: 'Venice', spotId: 4211},
  {name: 'Topanga', city: 'Topanga', spotId: 4210},
  {name: 'El Porto', city: 'El Segundo', spotId: 4900},
  {name: 'Hermosa Beach', city: 'Hermosa Beach', spotId: 4902},
  {name: 'The Wedge', city: 'Newport Beach', spotId: 4232},
  {name: 'Salt Creek Beach', city: 'Dana Point', spotId: 4233},
  {name: 'Seal Beach', city: 'Seal Beach', spotId: 4217},
  {name: 'T Street', city: 'San Clemente', spotId: 4235},
  {name: 'Point Dume', city: 'San Clemente', spotId: 4947},
  {name: 'Lower Trestles', city: 'San Clemente', spotId: 4740},
  {name: 'Upper Trestles', city: 'San Clemente', spotId: 4738}
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

    $('#results').append(`${city}: ${temp}<br>`)

    map.addMarker({
      lat: `${cityLat}`,
      lng: `${cityLong}`,
      title: `${city}`,
      infoWindow: {
        content: `<h5>${city}</h5><img src='${icon}'/><span id='temp'> ${temp}</span>`
      }
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
    theLi.html(name)
    theLi.attr('city', surfSpots[i].city)
    theLi.attr('spotId', surfSpots[i].spotId)
    surfLocations.append(theLi)
  }
  $('#surf-locations li').on('click', boxClickHandler)
}
populateSpots()


function boxClickHandler() {

  var city = this.getAttribute('city')
  var spotId = this.getAttribute('spotId')
  var name = this.innerHTML
  var lat
  var long
  var temp
  var icon
  var weatherApiUrl = 'http://api.wunderground.com/api/'
  // var weatherApiKey = process.env.WEATHER_API_KEY
  var weatherRequestUrl = `${weatherApiUrl}bcbbbaa572b97c9e/conditions/q/CA/${city}.json`

  // map.setCenter(marker.getPosition());

  var requestSettings = {
    method: 'get',
    url: '/search/' + this.getAttribute('spotId')
  }

  function cb(d) {
    lat = d.Quickspot.lat
    long = d.Quickspot.lon
  }

  setTimeout(function() {
    map.addMarker({
      lat: lat,
      lng: long,
      title: `${name}`,
      infoWindow: {
        content: `<h5>${name}</h5><img src='${icon}'/><span id='temp'> ${temp}</span>`
      }
    });
  }, 2500)
  $.ajax(requestSettings).done(cb)

  //pulls weather info
  $.ajax({
    type: 'get',
    url: weatherRequestUrl
  }).done(function(data) {
    temp = data.current_observation.temperature_string
    icon = data.current_observation.icon_url
  })
}
