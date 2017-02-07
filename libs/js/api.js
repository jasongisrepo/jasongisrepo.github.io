function loadMap() {
	var pointM = {lat: 0.3875401968477612, lng: 38.33465979687503};
    var mapOptions = {
        center:new google.maps.LatLng(-1.2920658999999999,36.8219462),
		zoom:7,
		mapTypeId:google.maps.MapTypeId.HYBRID,
		disableDefaultUI: true,
		panControl: true,
		zoomControl: true,
		fullscreenControl: true,
		streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
		},
		zoomControlOptions: {
		style: google.maps.ZoomControlStyle.MEDIUM
		},
		scaleControl: true,
		streetViewControl:true,
		overviewMapControl:true,
		rotateControl:true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONATAL_BAR,   //DROPDOWN_MENU
			position:google.maps.ControlPosition.TOP_RIGHT,
			mapTypeIds: [
			google.maps.MapTypeId.ROADMAP,
			'blue_base_map'
			],
		},
	
    };
		
      var map = new google.maps.Map(document.getElementById("map"),mapOptions);
	var marker = new google.maps.Marker({
      position: pointM,
      map: map,
	  animation:google.maps.Animation.BOUNCE
    });
	  
	var iconicMarker = new google.maps.Marker({
		position: new google.maps.LatLng(-0.35087366138498016, 36.9305419921875),
		map: map,
		title:'Custom Marker',
		draggable:true,
		icon:'libs/img/marker-icon.png'
	});
		iconicMarker.setMap(map);
		//marker.setMap(null);
		
		google.maps.event.addDomListener(iconicMarker, 'click', function(evnt) {
		console.log(evnt.latLng.lat()+","+evnt.latLng.lng()+"\n");
		});
		
	var tourplan=new google.maps.Polyline({
		path:[new google.maps.LatLng(0.02815246468751837,36.1669921875),
		new google.maps.LatLng(-0.5815787579969492,36.1724853515625),
		new google.maps.LatLng(-1.1747681438190487,36.62841796875),
		new google.maps.LatLng(-1.3340316734680435,36.881103515625),
		new google.maps.LatLng(-1.301081403555376,37.716064453125),
		new google.maps.LatLng(-0.8067818096439537,38.0950927734375),
		new google.maps.LatLng(-0.2355187459228161,38.1060791015625),
		new google.maps.LatLng(0.23139890707702482,37.705078125),
		new google.maps.LatLng(0.23689202526852574,38.0126953125)
		],
		strokeColor:"#0000FF",
		strokeOpacity:0.6,
		strokeWeight:2
	});
		tourplan.setMap(map);
		//to remove plylines
		//tourplan.setmap(null);
	var myrectangle=new google.maps.Rectangle({
		strokeColor:"#0000FF",
		strokeOpacity:0.6,
		strokeWeight:2,
		fillColor:"#0000FF",
		fillOpacity:0.4,
		map:map,
		bounds:new google.maps.LatLngBounds(
		new google.maps.LatLng(1.2420444341467345,35.8758544921875),
		new google.maps.LatLng(0.5499946050245949,36.8646240234375))
	});
		myrectangle.setMap(map);
		
	var myCity = new google.maps.Circle({
		center:new google.maps.LatLng(-1.3065731453895093,36.8316650390625),
		radius:55060,
		strokeColor:"#B40404",
		strokeOpacity:0.6,
		strokeWeight:2,
		fillColor:"#B40404",
		fillOpacity:0.6
	});
		myCity.setMap(map);
		
		var infowindow = new google.maps.InfoWindow({
		content:"Drag and click."
		});
		infowindow.open(map,iconicMarker);
		
	var arrowStart = new google.maps.Marker({
		position: new google.maps.LatLng(0.033645627949120294,36.1614990234375),
		icon: {
		path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		scale: 5,
		strokeWeight:2,
		strokeColor:"#B40404"
		},
		//draggable:true,
		map: map,
	});
		arrowStart.setMap(map);
	var arrowEnd = new google.maps.Marker({
		position: new google.maps.LatLng(0.2423851412825935,38.0511474609375),
		icon: {
		path: google.maps.SymbolPath.CIRCLE,
		scale: 5,
		strokeWeight:2,
		strokeColor:"#B40404"
		},
		//draggable:true,
		map: map,
	});
		arrowEnd.setMap(map);
	var arrowM1 = new google.maps.Marker({
		position: new google.maps.LatLng(-1.1198475179705427,37.9962158203125),
		icon: {
		path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		scale: 5,
		strokeWeight:2,
		strokeColor:"#B40404"
		},
		//draggable:true,
		map: map,
	});
		arrowM1.setMap(map);
	var arrowM2 = new google.maps.Marker({
		position: new google.maps.LatLng(-0.4167901473601783,38.0841064453125),
		icon: {
		path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		scale: 5,
		strokeWeight:2,
		strokeColor:"#B40404"
		},
		//draggable:true,
		map: map,
	});
		arrowM2.setMap(map);
	var arrowM3 = new google.maps.Marker({
		position: new google.maps.LatLng(-0.5815787579969492,36.1724853515625),
		icon: {
		path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		scale: 5,
		strokeWeight:2,
		title:'Arrow 3',
		strokeColor:"#B40404"
		},
		//draggable:true,
		map: map,
	});
		arrowM3.setMap(map);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		function(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		//Creating LatLng object with latitude and
		//longitude.
		var devCenter = new google.maps.LatLng(lat, lng);
		map.setCenter(devCenter);
		map.setZoom(9);
		//console.log(lat+","+lng);
		});
	}
$(document).ready(function(){
		
	$('#btnZoomToNai').on('click', function(){
		zoomToNairobi();
	});
	$('#btnZoomToStr').on('click', function(){
		zoomToStreet();
	});
	$('#btnDisableDrag').on('click', function(){
		disableDrag();
	});
	$('#btnMaxZoom').on('click', function(){
		setMaxZoom();
	});
	$('#btnMinZoom').on('click', function(){
		setMinZoom();
	});
	$('#btnChangeUI').on('click', function(){
		changeUI();
	});
	$('#btnDisableScroll').on('click', function(){
		disableScroll();
	});
	$('input[name="roadmap"]').on('click', function(){
		viewRoadMap();
	});
});
	
	
		function zoomToNairobi() {
		var nairobi = new google.maps.LatLng(-1.1198475179705427,37.9962158203125);
		map.setCenter(nairobi);
		}
		function zoomToStreet() {
		var naks = new google.maps.LatLng(-0.2866303886032778,36.063072681427);
		map.setCenter(naks);
		map.setZoom(21);
		}
		function disableDrag() {
		map.setOptions ({ draggable: false });
		}
		function setMaxZoom() {
		map.setOptions ({ maxZoom: 18 });
		}
		function setMinZoom() {
		map.setOptions ({ minZoom: 6 });
		}
		function changeUI() {
		map.setOptions ({ disableDefaultUI: true });
		}
		function disableScroll() {
		map.setOptions ({ scrollwheel: false });
		}
		function viewRoadMap() {
		map.setOptions({ 
		mapTypeId : google.maps.MapTypeId.ROADMAP
		});
		console.log("Road map changed!");
		}
	
	var bluishStyle = [
		{
		stylers: [
		{ hue: "#009999" },
		{ saturation: -5 },
		{ lightness: -40 }
		]
		},
		{
		featureType: "road",
		elementType: "geometry",
		stylers: [
		{ lightness: 100 },
		{ visibility: "simplified" }
		]
		},
		{
		featureType: "water",
		elementType: "geometry",
		stylers: [
		{ hue: "#0000FF" },
		{saturation:-40}
		]
		},
		{
		featureType: "administrative.neighborhood",
		elementType: "labels.text.stroke",
		stylers: [
		{ color: "#E80000" },
		{weight: 1}
		]
		},
		{
		featureType: "road",
		elementType: "labels.text",
		stylers: [
		{ visibility: "off" }
		]
		},
		{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [
		{ color: "#FF00FF" },
		{weight: 2}
		]
		}
		];
	var blueBaseMap = new google.maps.StyledMapType(bluishStyle, {name: "Blue Base Map"});
	map.mapTypes.set('blue_base_map', blueBaseMap);
	//map.setMapTypeId('blue_base_map');
	
	
	
}
	  
