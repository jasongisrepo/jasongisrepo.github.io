

	$(document).ready(function(){

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

	function loadMap(){
	google.maps.visualRefresh = true;
	var mapOptions = {
	center: new google.maps.LatLng(0.120850, 36.508742),
	zoom: 9,
	backgroundColor: 'khaki',
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: true,
	/*
	scaleControl: true,
	scaleControlOptions: {
		position: google.maps.ControlPosition.BOTTOM_RIGHT
	},
	*/
	
	zoomControl: true,
	zoomControlOptions: {
		style: google.maps.ZoomControlStyle.LARGE
	},
	mapTypeControl: false,
	streetViewControl: true,
	streetViewControlOptions: {
		position: google.maps.ControlPosition.RIGHT_BOTTOM
	},
	overviewmapControl: true,
	overviewmapControlOptions: {
		opened: true
	}
	};
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, mapOptions);

	var marker = new google.maps.Marker({
	position: new google.maps.LatLng(0.4422, 37.0333),
	animation:google.maps.Animation.BOUNCE
	});
	marker.setMap(map);
	  var iconicMarker = new google.maps.Marker({
			position: new google.maps.LatLng(0.120850, 36.508742),
			map: map,
			draggable:true,
			icon:'libs/img/marker-icon.png',
			label: {
				fontFamily: 'lucida console',
				fontStyle: 'italic',
				fontWeight: '2px',
				text: 'Marker',
				color: 'red'
			},
			crossOnDrag: false,
			cursor: 'pointer',
			opacity: 0.6
			});
		iconicMarker.setMap(map);
		  google.maps.event.addListener(iconicMarker, 'click', function(evt){
			  var lat = evt.latLng.lat().toFixed(4);
			  var lng = evt.latLng.lng().toFixed(4);
			  console.log("\n\["+lat+", "+lng+"\],");

		});
		

		var blueBaseMap = new google.maps.StyledMapType(blueStyle, {name: "Blue_Map"});
		map.mapTypes.set('blue_baseMap', blueBaseMap);
		var night_mode = new google.maps.StyledMapType(nightStyle, {name: "Night_Mode"});
		map.mapTypes.set('nightMode', night_mode);
		var osmMap = new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
			return "http://tile.openstreetmap.org/" + zoom +
			"/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "OSM", 
			maxZoom: 20,
			opacity: 0.7
		});		  
		map.mapTypes.set('OSM', osmMap);
		
	  var centerControlDiv = document.createElement('div');
	  var centerControl = new CenterControl(centerControlDiv, map, centerPoint);

	  centerControlDiv.index = 1;
	  centerControlDiv.style['padding-top'] = '4px';
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
	  
	  var geoLocate = document.createElement('div');
	  var geoLocated = new geoLocator(geoLocate, map);
	  geoLocate.style['padding-top'] = '4px';
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(geoLocate);
		
	  var iconContainer = document.createElement('div');
	  var setBaseMaps = new addlayersIcon(iconContainer, map);
	  iconContainer.style['padding-top'] = '4px';
	  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(iconContainer);
	  
	  var coordBox = document.createElement('div');
	  var modBox = new getOverCooord(coordBox, map);
	  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(coordBox);

	  
	  
	  var drawingManager = new google.maps.drawing.DrawingManager({
		  drawingControl: true,
		  drawingControlOptions: {
			  position: google.maps.ControlPosition.TOP_RIGHT
		  },
		//drawingMode: google.maps.drawing.OverlayType.MARKER,
		polylineOptions: {
		strokeColor: 'violet',
		strokeWeight: 3
		},
		polygonOptions: {
		strokeColor: 'green',
		strokeWeight: 2,
		fillColor: 'pink',
		fillOpacity: 0.2
		},
		markerOptions: {
			draggable: true,
			title: "Temp Marker",
			icon: 'http://maps.google.com/mapfiles/kml/pal2/icon5.png',
			crossOnDrag: false
		},
		rectangleOptions: {
		strokeColor: 'blue',
		strokeWeight: 2,
		fillColor: 'grey',
		fillOpacity: 0.3
		},
		circleOptions: {
		strokeColor: 'blue',
		strokeWeight: 2,
		fillColor: 'yellow',
		fillOpacity: 0.2
		}
	  });
		drawingManager.setMap(map);
		
		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event){
		if (event.type == 'polyline') {
			event.overlay.setEditable(true);
			event.overlay.setDraggable(true);
			drawingManager.setDrawingMode(null);
			var latlng = event.overlay.getPath().getArray().toString();
			var getlength = event.overlay.getLength();
			console.log('Shape Line Length : '+getlength/1000+'Km.\nLatLng String : '+latlng);
		}
		else if(event.type == google.maps.drawing.OverlayType.POLYGON){
				event.overlay.setEditable(true);
				event.overlay.setDraggable(true);
				drawingManager.setDrawingMode(null);
				customizePolygon();
		}
		else if(event.type == google.maps.drawing.OverlayType.RECTANGLE){
				event.overlay.setEditable(true);
				event.overlay.setDraggable(true);
				drawingManager.setDrawingMode(null);
				customizeRectangle();
		}
		else if(event.type == google.maps.drawing.OverlayType.CIRCLE){
				event.overlay.setEditable(true);
				event.overlay.setDraggable(true);
				drawingManager.setDrawingMode(null);
				var radius = event.overlay.getRadius();
				var bounds = event.overlay.getBounds();
				var center = event.overlay.getCenter();
				console.log('radius : '+radius+'mm. \nBounds : '+bounds+'\nCircle Center : '+center);
				google.maps.event.addListener(drawingManager, 'dragend', function(event){
					console.log('Center Changed to : ');
					center = event.overlay.getCenter();
					console.log(center);
				});
				google.maps.event.addListener(drawingManager, 'radius_changed', function(circle){
					console.log('radius changed to : ');
					radius = circle.getradius();
					console.log(radius);
				});
		}
		else if(event.type == google.maps.drawing.OverlayType.MARKER){
			drawingManager.setDrawingMode(null);
		}
		});
		
		
	  
	  }
	  
	  
	google.maps.event.addDomListener(window, 'load', loadMap);


	});


