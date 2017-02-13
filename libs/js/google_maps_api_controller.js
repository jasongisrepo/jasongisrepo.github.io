	function openInfoWin(lat, lng, map, marker){
	var infoWin = new google.maps.InfoWindow({
		content: '\('+lat+', '+lng+'\)'
	});
	google.maps.event.addListener(marker, 'click', function(){
		infoWin.open(map, marker);
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
				autoFindLocation();
			});
		}
		
	function autoFindLocation(){
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
		console.log('Current Location Coordinates\('+lat+', '+lng+'\)');
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
