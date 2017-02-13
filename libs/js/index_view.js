function initGoogleMaps() {
  map = new google.maps.Map(document.getElementById('map'), {
  zoom: countries['ke'].zoom,
  center: countries['ke'].center,
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  disableDefaultUI: true,
  mapTypeControl: false,
  zoomControl: true,
  zoomControlOptions: {
	style: google.maps.ZoomControlStyle.LARGE
  },
  streetViewControl: true,
  streetViewControlOptions: {
	position: google.maps.ControlPosition.RIGHT_BOTTOM
  }
});
	var mapCenter = map.getCenter();
	var marker = new google.maps.Marker({
	position: new google.maps.LatLng(mapCenter.lat(), mapCenter.lng()),
	animation: google.maps.Animation.BOUNCE,
	map: map,
	draggable: true,
	crossOnDrag: false
	});
	var markerInfo = new google.maps.InfoWindow({
		content: "Map Center <br />\("+mapCenter.lat()+", "+ mapCenter.lng()+"\)"
	});
	
	google.maps.event.addListener(marker, 'click', function(){
		markerInfo.open(map, marker);
	});
	
	var iconicMarker = new google.maps.Marker({
			position: new google.maps.LatLng(-1.5434, 36.6214),
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
			opacity: 0.6,
			map: map
			});
		  google.maps.event.addListener(iconicMarker, 'dragend', function(evt){
		    var lat = evt.latLng.lat().toFixed(4);
		    var lng = evt.latLng.lng().toFixed(4);
			openInfoWin(lat, lng, map, iconicMarker);
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
