

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
					center = event.overlay.getRadius();
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
		
		
	   var request = {
		location: centerPoint,
		radius: 90000,
		types: ['restaurant']
	  };
	  var processRequest = {
		location: centerPoint,
		radius: 90000,
		types: ['club']
	  };
	  
	  var modRequest = {
		  location: {lat:0.120850, lng:36.508742},
		  radius: 50000,
		  name: 'GIS',
		  keyword: 'geo',
		  rankBy: google.maps.places.RankBy.DISTANCE
		 // type: 
	  }

	  service = new google.maps.places.PlacesService(map);
	  infoPopup = new google.maps.InfoWindow();
	  service.nearbySearch(request, callback);
	  map.addListener('idle', performSearch);
	  service.nearbySearch(processRequest, processResults);
	  
	   infoWindow = new google.maps.InfoWindow({
			  content: document.getElementById('info-content')
			});

			autocomplete = new google.maps.places.Autocomplete(
				(
					document.getElementById('autocomplete')), {
				  types: ['(cities)'],
				  componentRestrictions: countryRestrict
				});
			places = new google.maps.places.PlacesService(map);

			autocomplete.addListener('place_changed', onPlaceChanged);
			
			document.getElementById('country').addEventListener(
				'change', setAutocompleteCountry);
				
			
	
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,
          panel: document.getElementById('dst-panel')
        });

        directionsDisplay.addListener('directions_changed', function() {
          computeTotalDistance(directionsDisplay.getDirections());
        });
		
        
		var startPoint = document.getElementById('start');
		var endPoint = document.getElementById('end');
		var wayPoint = document.getElementById('waypoints');
		var startSearch = new google.maps.places.SearchBox(startPoint);
		var endSearch = new google.maps.places.SearchBox(endPoint);
        var waySearch = new google.maps.places.SearchBox(wayPoint);
		
        waySearch.addListener('places_changed', function() {
          var places =waySearch.getPlaces();
          if (places.length == 0) {
            return;
          }
         
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
			var placeLocation = {
			location: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()}
			};
			addWayPoints.push(placeLocation);
			displayNewRoute(addWayPoints, directionsService, directionsDisplay);
			var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
			
            var placeMarker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            });
			var placeInfo = new google.maps.InfoWindow({
				content: '<h3><b>'+place.address_components[1].long_name+','+place.address_components[2].long_name+'</b></h3>'
			});
			google.maps.event.addListener(placeMarker, 'click', function(){
				placeInfo.open(map, placeMarker);
			});
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
	  
	   startSearch.addListener('places_changed', function() {
          var places =startSearch.getPlaces();
          if (places.length == 0) {
            return;
          }
         
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
			origin = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()); 
			var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
			
            var placeMarker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            });
			var placeInfo = new google.maps.InfoWindow({
				content: '<h3><b>'+place.address_components[1].long_name+','+place.address_components[2].long_name+'</b></h3>'
			});
			google.maps.event.addListener(placeMarker, 'click', function(){
				placeInfo.open(map, placeMarker);
			});
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
		
		
		 endSearch.addListener('places_changed', function() {
          var places =endSearch.getPlaces();
          if (places.length == 0) {
            return;
          }
         
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
			destination = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
			displayMyRoute(directionsService, directionsDisplay);
			var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
			
            var placeMarker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            });
			var placeInfo = new google.maps.InfoWindow({
				content: '<h3><b>'+place.address_components[1].long_name+','+place.address_components[2].long_name+'</b></h3>'
			});
			google.maps.event.addListener(placeMarker, 'click', function(){
				placeInfo.open(map, placeMarker);
			});
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
	  
	  
	  
	  }
	  
	  function customizePolyline(){
			google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline){
			var latlng = polyline.getPath().getArray().toString();
			var getlength = polyline.getLength();
			console.log('Shape Line Length : '+getlength/1000+'Km.\nLatLng String : '+latlng);
			});
		}
		
		function customizePolygon(){
			google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){
				var latlng = polygon.getPath().getArray().toString();
				var area = polygon.getArea();
				var perimeter = polygon.getLength();
				console.log('Shape Area : '+area/1000000+'Km sqd.\nShape Perimeter : '+perimeter/1000+'Km.\nLatLng String : '+latlng);
			});
		}
		function customizeCircle(){
			google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle){
			var radius = circle.getRadius();
			console.log('Radius : '+radius);
			});
		}
		function customizeRectangle(){
			google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(polygon){
			var bounds = polygon.getBounds().toString();
			console.log(bounds);
			});
		}
		
		
		google.maps.Polyline.prototype.getLength = function(){
		return google.maps.geometry.spherical.computeLength(this.getPath());
		};
		
		google.maps.Polygon.prototype.getArea = function(){
		return google.maps.geometry.spherical.computeArea(this.getPath());
		};
		google.maps.Polygon.prototype.getLength = function(){
		return google.maps.geometry.spherical.computeLength(this.getPath());
		};
		
		google.maps.Rectangle.prototype.getArea = function()
		{
		return google.maps.geometry.spherical.computeArea(this.getPath());
		};
		google.maps.Rectangle.prototype.getLength = function(){
		return google.maps.geometry.spherical.computeLength(this.getPath());
		};
		
		google.maps.Circle.prototype.getLength = function(){
		return google.maps.geometry.spherical.computeLength(this.getPath());
		};
		google.maps.Circle.prototype.getArea = function()
		{
		return google.maps.geometry.spherical.computeArea(this.getPath());
		};
		
		
	  function callback(result, status){
		  if(status == google.maps.places.PlacesServiceStatus.OK){
			  for (var count  = 0; count < result.length; count++){
				  createMarker(result[count], 'spa');
			  }
		  }
	  }
	  
	  function createMarker(point, icon){
			   var marker = new google.maps.Marker({
			  map: map,
			  position: point.geometry.location,
			  icon: 'libs/icons/health & edu/'+icon+'.png',
			  title: 'Service Search',
			  draggable: false,
			  crossOnDrag: false
			});
			google.maps.event.addListener(marker, 'click', function(){
				var types = [];
				for(var count = 0; count<point.types.length; count++)
				{
					var type = count +'.  '+point.types[count]+' .<br />';
					types.push(type);
				}
				infoPopup.setContent('Name : '+point.name+'<br />Coords : '+point.geometry.location+'<br />Vicinity :'+point.vicinity+
				'<br />Types : ... <br />'+types + '<br />Rating : '+point.rating);
				infoPopup.open(map, this);
			});
		}
	  
	  
	 function performSearch() {
			var request = {
			  bounds: map.getBounds(),
			  keyword: 'restaurant'
			};
			service.radarSearch(request, volSearch);
		  }

		  function volSearch(results, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
			  console.error(status);
			  return;
			}
			for (var i = 0, result; result = results[i]; i++) {
			  addMarker(result, 'workshop');
			}
		  }

		  function addMarker(place, icon) {
			var marker = new google.maps.Marker({
			  map: map,
			  position: place.geometry.location,
			  icon: {
				url: 'libs/icons/health & edu/'+icon+'.png',
				//anchor: new google.maps.Point(10, 10),
				scaledSize: new google.maps.Size(25, 20)
			  }
			});

			google.maps.event.addListener(marker, 'click', function() {
			  service.getDetails(place, function(result, status) {
				if (status !== google.maps.places.PlacesServiceStatus.OK) {
				  console.error(status);
				  return;
				}
				infoPopup.setContent(result.name);
				infoPopup.open(map, marker);
			  });
			});
		  }
			
			
		  function processResults(results, status, pagination) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
			  return;
			} else {
			  processMarker(results);

			  if (pagination.hasNextPage) {
				var moreButton = document.getElementById('more');

				moreButton.disabled = false;

				moreButton.addEventListener('click', function() {
				  moreButton.disabled = true;
				  pagination.nextPage();
				});
			  }
			}
		  }

		  function processMarker(places) {
			var bounds = new google.maps.LatLngBounds();
			var placesList = document.getElementById('places');

			for (var i = 0, place; place = places[i]; i++) {
			  var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			  };

			  var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			  });

			  placesList.innerHTML += '<li>' + place.name + '</li>';

			  bounds.extend(place.geometry.location);
			}
			map.fitBounds(bounds);
		  }
			
			
	function geoLocator(div, map){
			div.style.clear = 'both';
			var locator = document.createElement('div');
			locator.id = 'locator';
			locator.title = 'Search Feature Location';
			div.appendChild(locator);
			var locatorTxt = document.createElement('div');
			locatorTxt.id = 'locatorTxt';
			locatorTxt.innerHTML = 'Geolocate';
			locator.appendChild(locatorTxt);
			locator.addEventListener('click', function(){
			console.log('Geolocate');
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function(position){
						var lat = position.coords.latitude;
						var lng = position.coords.longitude;
						var divCenter = new google.maps.LatLng(lat, lng);
						map.setCenter(divCenter);
						map.setZoom(17);
						console.log(lat+", "+lng);
						var marker = new google.maps.Marker({
							position: divCenter,
							title: "Current Location Marker."
						});
						marker.setMap(map);
					});
				
				}
			});
		}
		
		
	function addlayersIcon(container, map){
		var iconDiv = document.createElement('div');
		iconDiv.id = 'iconDiv';
		iconDiv.title = 'Change BaseMap';
		container.appendChild(iconDiv);
		var icon = document.createElement('img');
		icon.id = 'layersImage';
		icon.alt = 'BaseMaps';
		icon.src = 'libs/img/layers.png';
		iconDiv.appendChild(icon);
		var baseMapsHtml = 
		'<div id="baseMapControl">'+
		'<input type="checkbox" id="satellite" /><label >Satellite</label><br />'+
		'<input type="checkbox" id="hybrid" /><label >Hybrid</label><br />'+
		'<input type="checkbox" id="terrain" /><label >Terrain</label><br />'+
		'<input type="checkbox" id="osm" /><label >OSM</label><br />'+
		'<input type="checkbox" id="bluestyle" /><label >BlueStyle</label><br />'+
		'<input type="checkbox" id="roadmap" /><label >RoadMap</label><br />'+
		'<input type="checkbox" id="nightMode" /><label >Night_Mode</label><br />'+
		'<input type="checkbox" id="africaLayer" /><label >Africa_Layer</label><br />'+
		'<input type="checkbox" id="kenyaRoads" /><label >Kenya_Roads</label><br />'+
		'<input type="checkbox" id="kenyaTowns" /><label >Kenya_Towns</label><br />'+
		'</div>';
		var layerDiv = document.createElement('div');
		layerDiv.id = 'basemaps';
		layerDiv.innerHTML = baseMapsHtml;
		icon.addEventListener('mouseover', function(){
		iconDiv.appendChild(layerDiv);
		$('#satellite, #hybrid, #terrain, #osm, #bluestyle,#roadmap, #nightMode').on('click', function(){
		$(this).toggleClass('checked');
						
				if($('#satellite').hasClass('checked')){
					map.setOptions({ 
						mapTypeId : google.maps.MapTypeId.SATELLITE
						});
				}
				else if($('#hybrid').hasClass('checked')){
					map.setOptions({
						mapTypeId: google.maps.MapTypeId.HYBRID
					});
				}
				else if($('#terrain').hasClass('checked')){
					map.setOptions({
						mapTypeId: google.maps.MapTypeId.TERRAIN
					});
				}
				else if($('#roadmap').hasClass('checked')){
					map.setOptions({
						mapTypeId: google.maps.MapTypeId.ROADMAP
					});
				}
				else if($('#osm').hasClass('checked')){
					map.setMapTypeId('OSM');
				}
				else if($('#bluestyle').hasClass('checked')){
				map.setMapTypeId('blue_baseMap');
				}
				else if($('#nightMode').hasClass('checked')){
				map.setMapTypeId('nightMode');
				}

		});
			
			
		$('#africaLayer').click(function(){
		$(this).toggleClass('checked');
		if($(this).hasClass('checked')){
			$.getJSON('libs/data/africa.geojson', function(africaLayer){
			$.each(africaLayer.features, function(key, val){
				drawLayer(val.geometry, val.properties, map);
			});	
			});
		}
		});

		$('#kenyaRoads').click(function(){
			$(this).toggleClass('checked');
			if($(this).hasClass('checked')){
				$.getJSON('libs/data/kenya_roads.geojson', function(kenyaRoads){
				$.each(kenyaRoads.features, function(key, val){
					drawLayer(val.geometry, val.properties, map);
				});	
				});
			}
		});

		$('#kenyaTowns').click(function(){
			$(this).toggleClass('checked');
			if($(this).hasClass('checked')){
				$.getJSON('libs/data/kenya_towns.geojson', function(kenyaTowns){
				$.each(kenyaTowns.features, function(key, val){
					drawLayer(val.geometry, val.properties, map);
				});	
				});
			}
		});

			
			
		});
		
		
		icon.addEventListener('mouseout', function(){
			var timer = setTimeout(
			function(){
			iconDiv.removeChild(layerDiv);
			}
			, 5000);
			
		});
	}




	function CenterControl(controlDiv, map, center) {
	  var control = this;
	  control.center_ = center;
	  controlDiv.style.clear = 'both';
	  var goCenterUI = document.createElement('div');
	  goCenterUI.id = 'goCenterUI';
	  goCenterUI.title = 'Click to recenter the map';
	  controlDiv.appendChild(goCenterUI);
	  var goCenterText = document.createElement('div');
	  goCenterText.id = 'goCenterText';
	  goCenterText.innerHTML = 'Center Map';
	  goCenterUI.appendChild(goCenterText);
	  var setCenterUI = document.createElement('div');
	  setCenterUI.id = 'setCenterUI';
	  setCenterUI.title = 'Click to change the center of the map';
	  controlDiv.appendChild(setCenterUI);
	  var setCenterText = document.createElement('div');
	  setCenterText.id = 'setCenterText';
	  setCenterText.innerHTML = 'Set Center';
	  setCenterUI.appendChild(setCenterText);
	  goCenterUI.addEventListener('click', function() {
		var currentCenter = control.getCenter();
		map.setCenter(currentCenter);
	  });

	  setCenterUI.addEventListener('click', function() {
		var newCenter = map.getCenter();
		control.setCenter(newCenter);
	  });
	}

	CenterControl.prototype.center_ = null;

	CenterControl.prototype.getCenter = function() {
	  return this.center_;
	};

	CenterControl.prototype.setCenter = function(center) {
	  this.center_ = center;
	};

	function getOverCooord(box, map){
		var coordDiv = document.createElement('div');
		coordDiv.id = 'overCoord';
		coordDiv.title = 'MouseOver Coordinates';
		google.maps.event.addListener(map, 'mousemove', function(e){
			var lat = e.latLng.lat().toFixed(5);
			var lng =e.latLng.lng().toFixed(5);
			coordDiv.innerHTML = '<h4><b><i>Lat , Lng &rarr; </i>\&nbsp;&nbsp;&nbsp;['+lat+' , ' +lng+'\]</b></h4>';
			box.appendChild(coordDiv);
		});
	}


	function drawLayer(geometry, properties){
			if(geometry.type == 'Point'){
				var coord = new google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0]);
				var marker = new google.maps.Marker({
					position: coord,
					map: map,
					title: 'Geometry marker'
				});
				var infoPop= new google.maps.InfoWindow({
					content: '<span id="feature-info">Town Name : '+properties.TOWN_NAME+'<br />Town Type : '+properties.TOWN_TYPE+'</span>'
				});
				google.maps.event.addDomListener(marker, 'click', function(){
					infoPop.open(map, marker);
				});
			}
			else if(geometry.type == 'LineString'){
				console.log(properties);
				var linePath = [];
				for(var count = 0; count <geometry.coordinates.length; count++){
					var tmpPoints = new google.maps.LatLng(geometry.coordinates[count][1], geometry.coordinates[count][0]);
					linePath.push(tmpPoints);
				}
				var lineOptions = {
					path: linePath,
					strokeWeight: 3,
					strokeColor: 'red',
					map: map,
					title: "Kenya LineStrings"
				};
				var polyLine = new google.maps.Polyline(lineOptions);
				polyLine.setMap(map);
			}
			else if(geometry.type == 'MultiPolygon'){
				console.log(properties);
				var areaCover = [];
				for (var count = 0; count < geometry.coordinates[0][0].length; count++){
					var tmpPoints = new google.maps.LatLng(geometry.coordinates[0][0][count][1], geometry.coordinates[0][0][count][0]);
					areaCover.push(tmpPoints);
				} 
				var polygonOptions = {
					path: areaCover,
					strokeColor: "red",
					strokeOpacity: 0.7,
					strokeWeight: 2,
					fillColor: "violet",
					fillOpacity: 0.45,
					map: map
				};
				var polygon = new google.maps.Polygon(polygonOptions);
				polygon.setMap(map);
			}
		}
		
		 function onPlaceChanged() {
			var place = autocomplete.getPlace();
			if (place.geometry) {
			  map.panTo(place.geometry.location);
			  map.setZoom(15);
			  search();
			} else {
			  document.getElementById('autocomplete').placeholder = 'Enter a city';
			}
		  }
		  
		  function search() {
			var search = {
			  bounds: map.getBounds(),
			  types: ['lodging']
			};

			places.nearbySearch(search, function(results, status) {
			  if (status === google.maps.places.PlacesServiceStatus.OK) {
				clearResults();
				clearMarkers();
				
				for (var i = 0; i < results.length; i++) {
				  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
				  var markerIcon = MARKER_PATH + markerLetter + '.png';
				  markers[i] = new google.maps.Marker({
					position: results[i].geometry.location,
					animation: google.maps.Animation.DROP,
					icon: markerIcon
				  });
				
				  markers[i].placeResult = results[i];
				  google.maps.event.addListener(markers[i], 'click', showInfoWindow);
				  setTimeout(dropMarker(i), i * 100);
				  addResult(results[i], i);
				}
			  }
			});
		  }

		  function clearMarkers() {
			for (var i = 0; i < markers.length; i++) {
			  if (markers[i]) {
				markers[i].setMap(null);
			  }
			}
			markers = [];
		  }
		  
		  function setAutocompleteCountry() {
			var country = document.getElementById('country').value;
			if (country == 'all') {
			  autocomplete.setComponentRestrictions([]);
			  map.setCenter({lat: 15, lng: 0});
			  map.setZoom(2);
			} else {
			  autocomplete.setComponentRestrictions({'country': country});
			  map.setCenter(countries[country].center);
			  map.setZoom(countries[country].zoom);
			}
			clearResults();
			clearMarkers();
		  }

		  function dropMarker(i) {
			return function() {
			  markers[i].setMap(map);
			};
		  }

		  function addResult(result, i) {
			var results = document.getElementById('results');
			var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
			var markerIcon = alphMarkerPath + markerLetter + '.png';

			var tr = document.createElement('tr');
			tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
			tr.onclick = function() {
			  google.maps.event.trigger(markers[i], 'click');
			};

			var iconTd = document.createElement('td');
			var nameTd = document.createElement('td');
			var icon = document.createElement('img');
			icon.src = markerIcon;
			icon.setAttribute('class', 'placeIcon');
			icon.setAttribute('className', 'placeIcon');
			var name = document.createTextNode(result.name);
			iconTd.appendChild(icon);
			nameTd.appendChild(name);
			tr.appendChild(iconTd);
			tr.appendChild(nameTd);
			results.appendChild(tr);
		  }

		  function clearResults() {
			var results = document.getElementById('results');
			while (results.childNodes[0]) {
			  results.removeChild(results.childNodes[0]);
			}
		  }

		  function showInfoWindow() {
			var marker = this;
			places.getDetails({placeId: marker.placeResult.place_id},
				function(place, status) {
				  if (status !== google.maps.places.PlacesServiceStatus.OK) {
					return;
				  }
				  infoWindow.open(map, marker);
				  buildIWContent(place);
				});
		  }
		  
		  function buildIWContent(place) {
			document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
				'src="' + place.icon + '"/>';
			document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
				'">' + place.name + '</a></b>';
			document.getElementById('iw-address').textContent = place.vicinity;

			if (place.formatted_phone_number) {
			  document.getElementById('iw-phone-row').style.display = '';
			  document.getElementById('iw-phone').textContent =
				  place.formatted_phone_number;
			} else {
			  document.getElementById('iw-phone-row').style.display = 'none';
			}

			if (place.rating) {
			  var ratingHtml = '';
			  for (var i = 0; i < 5; i++) {
				if (place.rating < (i + 0.5)) {
				  ratingHtml += '&#10025;';
				} else {
				  ratingHtml += '&#10029;';
				}
			  document.getElementById('iw-rating-row').style.display = '';
			  document.getElementById('iw-rating').innerHTML = ratingHtml;
			  }
			} else {
			  document.getElementById('iw-rating-row').style.display = 'none';
			}

			if (place.website) {
			  var fullUrl = place.website;
			  var website = hostRegexp.exec(place.website);
			  if (website === null) {
				website = 'http://' + place.website + '/';
				fullUrl = website;
			  }
			  document.getElementById('iw-website-row').style.display = '';
			  document.getElementById('iw-website').textContent = website;
			} else {
			  document.getElementById('iw-website-row').style.display = 'none';
			}
		  }

	  function displayRoute(service, display) {
		var wayptsArray = [];
		var wayptsLen = waypts.length  - 1;
		for(var i = 1; i<(wayptsLen); i++){
		  wayptsArray.push({location: {lat:waypts[i][0], lng:waypts[i][1]}});
		}
        service.route({
          origin: new google.maps.LatLng(waypts[0][0], waypts[0][1]),
          destination: new google.maps.LatLng(waypts[wayptsLen][0], waypts[wayptsLen][1]),
          waypoints: wayptsArray,
		  optimizeWaypoints: true,
          travelMode: 'DRIVING',
          avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
			 var route = response.routes[0];
			 /*
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                  '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
				*/
				
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }
	  
	   function displayNewRoute(wayPoint, service, display) {
		  if(origin == null && destination == null){
			alert("You need to specify Start and End Points");
		}
        service.route({
          origin: origin,
          destination: destination,
          waypoints: wayPoint,
		  optimizeWaypoints: true,
          travelMode: 'DRIVING',
          avoidTolls: false
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
			 var route = response.routes[0];
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }

	  function displayMyRoute(service, display) {
        if(origin == null && destination == null){
			alert("You need to specify Start and End Points");
		}
		service.route({
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING',
          avoidTolls: false
        }, 
		function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
			 var route = response.routes[0];
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }

      function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
      }

	  
	google.maps.event.addDomListener(window, 'load', loadMap);


	});


