function renderMarker(map, lat, long, type, name, waypoints = 0, origin = 0, destination = 0) {

  // List of icons to use with google maps
  var iconBase = 'img/';
  var icons = {
    plane: {
      icon: new google.maps.MarkerImage(
        iconBase + 'plane@1x.png',
        new google.maps.Size(30, 30),
        new google.maps.Point(0, 0),
        new google.maps.Point(15, 15)
      )
      // : iconBase + 'plane@1x.png'
    },
    airfield: {
      icon: new google.maps.MarkerImage(
        iconBase + 'base-icon.png',
        new google.maps.Size(60, 60),
        new google.maps.Point(0, 0),
        new google.maps.Point(30, 30)
      )
      //iconBase + 'base-icon.png'
    }
  };

  if (type == "plane") {
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+ name +'</h1>'+
        '<div id="bodyContent">'+
        '<h2 class="departed">Departed</h2>'+
        '<p></p>'+
        '<h2 class="arriving">Arriving</h2>'+
        '<p></p>'+
        '<h3 class="time_left">minutes left<h3>'+
        '<p></p>'+
        '<p></p>'+
        '</div>';
  } else {
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+ name +'</h1>'+
        '<div id="bodyContent">'+
        '<p></p>'+
        '<p></p>'+
        '</div>';
  }

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, long),
    icon: icons[type].icon,
    map: map,
    title: name
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  if (waypoints != 0) {
    var unsorted_waypoints = waypoints.split(" ");
    var path = [new google.maps.LatLng(lat, long)];
    for (way_count = 0; way_count < unsorted_waypoints.length; way_count = way_count + 2) {
      way_count2 = way_count + 1;
      path.push(new google.maps.LatLng(unsorted_waypoints[way_count], unsorted_waypoints[way_count2]));
    }

    console.log(path);
    var lines = new google.maps.Polyline({
        path: path,
        strokeColor: "#EF5B37",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
  }
}
