var fxml_url = 'http://rfdscentral:90c06dd71d1443bffa7f7fceb9e24739d1757516@flightxml.flightaware.com/json/FlightXML2/';

var flightsData = [];
var deferreds = [];
// When the button is clicked, fetch the details about the flights.
$(document).ready(function() {
  $('#go_button').click(function() {
    var flights = ["TGW585", "QFA662", "QFA651", "JST455"]
    $(flights).each( function( key, value ) {
      // Loops through each flight number and sends a request for the flight
      // details.
      deferreds.push(
        $.ajax({
          type: 'GET',
          url: fxml_url + 'InFlightInfo',
          data: {
            'ident': value
          },
          dataType: 'jsonp',
          jsonp: 'jsonp_callback',
          xhrFields: {
            withCredentials: true
          }
        })
      );
    });
    // When all ajax calls are done call renderFlights so google maps can draw
    // the map with all our flight data
    $.when.apply($, deferreds).then(function(){
      renderFlights(deferreds, "0");
    }).always(function(){

    });
  });
});
