console.log('app.js is loaded in the client....')

// ------ VARIABLES ------ //
var cityInput = $('#city-input')
var searchButton = $('#search-button')
var loading = '<h3>loading...</h3>'

var surfSpots = [
  {name: 'Rincon Beach', city: 'Santa Barbara', lat: 34.224096, long: -119.285572},
  {name: 'Manhattan Beach', city: 'Manhattan Beach', lat: 33.8837, long: -118.414},
  {name: 'Malibu Beach', city: 'Malibu', lat: 34.013332, long: -118.464713},
  {name: 'Zuma Beach', city: 'Malibu', lat: 34.011849, long: -118.495228},
  {name: 'Silver Strand Beach', city: 'Oxnard', lat: 34.091160, long: -119.121102},
  {name: 'Venice Beach', city: 'Venice', lat: 33.585417, long: -118.281741},
  {name: 'Port Hueneme Beach', city: 'Oxnard', lat: 34.083381, long: -119.114732},
  {name: 'Yerba Buena Beach', city: 'Malibu', lat: 34.030603, long: -118.573835},
  {name: 'Staircase Beach', city: 'Malibu', lat: 34.024740, long: -118.565140},
  {name: 'Hermosa Beach', city: 'Hermosa Beach', lat: 33.513852, long: -118.241018},
  {name: '36th Street Beach', city: 'Newport Beach', lat: 33.6147, long: -117.9379},
  {name: '64th Place Beach', city: 'Newport Beach', lat: 33.7464, long: -118.123}
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
    var icon = d.current_observation.icon_url

    $('#results').append(`${city}: ${temp}<br>`)
    // $('#results').append(`Lat: ${cityLat} Long: ${cityLong}`)
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
    theLi.attr('lat', surfSpots[i].lat)
    theLi.attr('long', surfSpots[i].long)
    theLi.attr('city', surfSpots[i].city)
    surfLocations.append(theLi)
  }
  $('#surf-locations li').on('click', boxClickHandler)
}
populateSpots()


function boxClickHandler() {
  // console.log(this.lat)
  // var elmnt = this
  // console.log(elmnt
  var lat = this.getAttribute('lat')
  var long = this.getAttribute('long')
  var city = this.getAttribute('city')
  var name = this.innerHTML
  var temp
  var icon


  console.log(`${name}: ${lat}, ${long}`)
  // map.setCenter(marker.getPosition());

  // marker: function() {
  //   map.addMarker({
  //     lat: `${lat}`,
  //     lng: `${long}`,
  //     title: `${name}`,
  //     infoWindow: {
  //       content: `<h5>${name}</h5><p>temp</p>`
  //     }
  //   });
  //   map.setCenter(marker.getPosition());
  // }

  var requestSettings = {
    method: 'get',
    url: '/search/' + this.getAttribute('city')
  }

  function cb(d) {
    console.log(d)
    temp = d.current_observation.feelslike_string
    // console.log(temp)
    icon = d.current_observation.icon_url
    // map.removeMarkers()
  }

  setTimeout(function() {
    map.addMarker({
      lat: `${lat}`,
      lng: `${long}`,
      title: `${name}`,
      infoWindow: {
        content: `<h5>${name}</h5><img src='${icon}'/><span id='temp'> ${temp}</span>`
      }
    });
  }, 1500)
  $.ajax(requestSettings).done(cb)

}
