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

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: countries['ke'].zoom,
          center: countries['ke'].center,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
        });

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
	  
		
		google.maps.event.addDomListener(window, 'load', initMap);
      }