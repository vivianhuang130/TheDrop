console.log('app.js is loaded in the client....')

// ------ VARIABLES ------ //
var cityInput = $('#city-input')
var searchButton = $('#search-button')
var loading = '<h3>loading...</h3>'

var surfSpots = [
  {name: 'Rincon', city: 'Santa Barbara', spotId: 4197},
  {name: 'Solimar', city: 'Ventura', spotId: 4989},
  {name: 'Zuma Beach', city: 'Malibu', spotId: 4949},
  {name: 'Point Dume', city: 'Malibu', spotId: 4947},
  {name: 'Malibu Beach', city: 'Malibu', spotId: 4209},
  {name: 'Topanga', city: 'Topanga', spotId: 4210},
  {name: 'Venice Beach', city: 'Venice', spotId: 4211},
  {name: 'El Porto', city: 'El Segundo', spotId: 4900},
  {name: 'Manhattan Beach', city: 'Manhattan Beach', spotId: 4901},
  {name: 'Hermosa Beach', city: 'Hermosa Beach', spotId: 4902},
  {name: 'Seal Beach', city: 'Seal Beach', spotId: 4217},
  {name: 'The Wedge', city: 'Newport Beach', spotId: 4232},
  {name: 'Salt Creek Beach', city: 'Dana Point', spotId: 4233},
  {name: 'T Street', city: 'San Clemente', spotId: 4235},
  {name: 'Upper Trestles', city: 'San Clemente', spotId: 4738},
  {name: 'Lower Trestles', city: 'San Clemente', spotId: 4740}
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
  var swellHeightArray
  var swellHeightMin
  var swellHeightMax
  var swellPeriodArray
  var swellPeriodMax = 0
  var swellPeriodMin = 100
  var waterTempMin
  var waterTempMax
  var windSpeed
  var windDirection
  var waterTemp
  var weatherApiUrl = 'http://api.wunderground.com/api/'
  var weatherRequestUrl = `${weatherApiUrl}bcbbbaa572b97c9e/conditions/q/CA/${city}.json`
  var requestSettings = {
    method: 'get',
    url: '/search/' + this.getAttribute('spotId')
  }

  function cb(d) {
    console.log(d)
    lat = d.Quickspot.lat
    long = d.Quickspot.lon

    swellPeriodArray = d.Surf.swell_period1[0]
    for (var i=0; i<swellPeriodArray.length; i++) {
      if (swellPeriodArray[i] < swellPeriodMin) {
        swellPeriodMin = swellPeriodArray[i]
      } else {
        swellPeriodMin = swellPeriodMin
      }
    }
    for (var i=0; i<swellPeriodArray.length; i++) {
      if (swellPeriodArray[i] > swellPeriodMax) {
        swellPeriodMax = swellPeriodArray[i]
      } else {
        swellPeriodMax = swellPeriodMax
      }
    }
    // swellPeriodArray.sort()
    // swellPeriodMax = swellPeriodArray[3]

    swellHeightArray = d.Surf.swell_height1[0]
    swellHeightArray.sort()
    swellHeightMin = swellHeightArray[0]
    swellHeightMax = swellHeightArray[3]

    waterTempMin = d.WaterTemp.watertemp_min
    waterTempMax = d.WaterTemp.watertemp_max

  }

  setTimeout(function() {
    map.addMarker({
      lat: lat,
      lng: long,
      title: `${name}`,
      infoWindow: {
        content: `<img src='${icon}' class='weather-pic'/><span class='bold'><p>${name}</p></span><span id='temp'> ${temp}</span><br><br><h4>Surf:</h4><p>${swellHeightMin}-${swellHeightMax} feet</p><p>${swellPeriodMin}-${swellPeriodMax} seconds</p><br><h4>Water Temp:</h4><p>${waterTempMin}-${waterTempMax} F`

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
