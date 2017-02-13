var countries = {
  
	'rw' : {
	center: {lat: -2.3394, lng: 29.8291},
	  zoom: 9
	},
	 'ke': {
	  center: {lat: -1.3073, lng: 36.8136},
	  zoom: 9
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


	var map,  service, infoPopup,  places, infoWindow, origin, destination,autocomplete;
	var centerPoint = {lat: 0.120850, lng: 36.50874};
	var boundSW = {lat: -90, lng: -180};
	var boundNE = {lat: 90, lng: 180};
	var defaultBounds = new google.maps.LatLngBounds(boundSW, boundNE);
	var markers = [];
	var addWayPoints = [];
	var countryRestrict = {'country': 'ke'};
	var markerCollection = 'http://kml4earth.appspot.com/icons.html';
	var numMarkerPath = 'http://maps.google.com/mapfiles/kml/paddle/';
	var alphMarkerPath = 'http://maps.google.com/mapfiles/kml/paddle/';
	var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
	var hostRegexp = new RegExp('^https?://.+?/');
	var waypts = [[-0.1689, 37.0237], [-0.0041, 37.0773],[0.2664, 36.5458],[0.1689, 36.4263],[-0.0865, 36.3673], [-0.1881, 36.2272],[-0.1250, 35.9278], [0.2815, 35.9114]];
	