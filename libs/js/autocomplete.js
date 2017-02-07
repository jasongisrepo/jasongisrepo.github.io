var map, places, infoWindow;
      var markers = [];
      var autocomplete;
      var countryRestrict = {'country': 'ke'};
	  var markerCollection = 'http://kml4earth.appspot.com/icons.html';
      var numMarkerPath = 'http://maps.google.com/mapfiles/kml/paddle/';
	  var alphMarkerPath = 'http://maps.google.com/mapfiles/kml/paddle/';
      var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
      var hostRegexp = new RegExp('^https?://.+?/');

      var countries = {
	  
        'rw' : {
		center: {lat: -2.3394, lng: 29.8291},
          zoom: 9
        },
         'ke': {
          center: {lat: -1.3073, lng: 36.8136},
          zoom: 5
        },
       'eth': {
          center: {lat: 30.4443, lng: 39.6728},
          zoom: 6
        },
		'br': {
          center: {lat: -3.7437, lng: 29.8291},
          zoom: 7
        },
        'cg': {
          center: {lat: -3.7437, lng: 22.7099},
          zoom: 8
        },
        'ssd': {
          center: {lat: 6.6973, lng: 30.4443},
          zoom: 6
        },
        'tz': {
          center: {lat: -8.2876, lng: 36.2451},
          zoom: 8
        },
        'sa': {
          center: {lat: -26.0074, lng: 28.2470},
          zoom: 7
        },
        'ngr': {
          center: {lat: 9.0479, lng: 7.3291},
          zoom: 9
        }
		
      };