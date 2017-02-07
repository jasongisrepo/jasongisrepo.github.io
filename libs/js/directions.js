function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: -1.3073, lng: 36.8136}
        });
		
        directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('right-panel'));
		
		
		var startMarker = new google.maps.Marker({
			position: new google.maps.LatLng(-0.71963, 36.42359),
			animation:google.maps.Animation.DROP,
			map: map,
			draggable: true,
			crossOnDrag: false
		});
		var startPoint = startMarker.getPosition();
		
		var endMarker = new google.maps.Marker({
			position: {lat: -1.3073, lng: 37.8136},
			animation:google.maps.Animation.DROP,
			map: map,
			draggable: true,
			crossOnDrag: false
		});
		
		var endPoint = endMarker.getPosition();
		getDirection(startPoint, endPoint);

		google.maps.event.addListener(startMarker, 'dragend' , function(evnt){
			getDirection(evnt.latLng, endPoint);
		});
		google.maps.event.addListener(endMarker, 'dragend' , function(evnt){
			getDirection(startPoint, evnt.latLng);
		});
		
		
		document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
		  
		var waypts = [];
		
		  
		  
        });

		
	
        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }
	  
	 
       
	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
		  var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
	  
	  
	  function getDirection(start, end){
		console.log('\['+start.lat().toFixed(5)+', '+start.lng().toFixed(5)+'\], \['+end.lat().toFixed(5)+', '+end.lng().toFixed(5)+'\]');
		}