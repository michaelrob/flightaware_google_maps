function renderFlights(flightsData, airports) {
  console.log(flightsData);

  // Store airfield information
  var airfields = [[-26.420444, 146.2577799, "Charleville RFDS Base"], [-32.0933704, 115.8774123, "Jandakot RFDS Base"]];

  // Render the data table into a map using Google Maps API.
  var australia = new google.maps.LatLng(-25.299075, 134.310429);
  var options = {
    zoom: 4,
    center: australia,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: 'all',
        stylers: [
          { saturation: -80 }
        ]
      },{
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          { hue: '#00ffee' },
          { saturation: 50 }
        ]
      },{
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]
  }
  var map = new google.maps.Map(document.getElementById('map_div'), options);

  // Add aircraft
  for (aircraft_count = 0; aircraft_count < flightsData.length; aircraft_count++) {
    var flight_results = flightsData[aircraft_count].responseJSON.InFlightInfoResult
    if(flight_results.latitude != 0) {
      renderMarker(map, flight_results.latitude, flight_results.longitude, "plane", flight_results.faFlightID, flight_results.waypoints, flight_results.origin, flight_results.destination)
    }
  }

  // Add airfields
  for (airfield_count = 0; airfield_count < airfields.length; airfield_count++) {
    renderMarker(map, airfields[airfield_count][0], airfields[airfield_count][1], "airfield", airfields[airfield_count][2])
  }
}
