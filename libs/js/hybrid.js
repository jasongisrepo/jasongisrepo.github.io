function loadMap() {
	var markerP = {lat: 0.3875401968477612, lng: 38.33465979687503};
	var mapOptions = {
	center: new google.maps.LatLng(0.3875401968477612, 38.33465979687503),
	zoom:8,
	disableDefaultUI: true,
	zoomControl: true,
	zoomControlOptions: {
	position: google.maps.ControlPosition.RIGHT_BOTTOM
	},
	rotateControl: true,
	rotateControlOptions: {
	position: google.maps.ControlPosition.BOTTOM_CENTER
	},
	mapTypeControl: true,
	fullscreenControl: true,
	fullscreenControlOptions: {
	position: google.maps.ControlPosition.RIGHT_CENTER
	},
	panControl: true,
	mapTypeControlOptions: {
		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,   //HORIZONATAL_BAR
		position:google.maps.ControlPosition.TOP_RIGHT,
		mapTypeIds: [
		google.maps.MapTypeId.ROADMAP,
		google.maps.MapTypeId.HYBRID,
		google.maps.MapTypeId.TERRAIN,
		google.maps.MapTypeId.SATELLITE,
		'OSM',
		'blue_baseMap'
		]
		},
	streetViewControl: true
	};
	var map = new google.maps.Map(document.getElementById("map"),mapOptions);
	var marker = new google.maps.Marker({
		  position: markerP,
		  map: map,
		  title: "Drag To get POI Coordinates Marker",
		  draggable: true
	   });
	
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
	map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
	map.overlayMapTypes.push(null);
	
	var heatmapPoints = [
		new google.maps.LatLng(-0.7683332944071554,39.2816162109375),
		new google.maps.LatLng(-0.7463625578083474,38.8201904296875),
		new google.maps.LatLng(-0.9660644519303068,38.4906005859375),
		new google.maps.LatLng(-1.471319591173067,38.4246826171875),
		new google.maps.LatLng(-1.7129253213316011,38.1170654296875),
		new google.maps.LatLng(-2.3058195944541593,38.9959716796875),
		new google.maps.LatLng(-2.3277742898359177,39.5233154296875),
		new google.maps.LatLng(-1.8666588319232633,39.7869873046875),
		new google.maps.LatLng(-2.569252661449245,39.4793701171875),
		new google.maps.LatLng(-3.359203629398616,38.9959716796875),
		new google.maps.LatLng(-2.92041126517687,38.6444091796875),
		new google.maps.LatLng(-2.7667921062175047,37.5018310546875),
		new google.maps.LatLng(-2.3058195944541593,37.8973388671875),
		new google.maps.LatLng(-1.9984197553841394,37.5018310546875)
	];
		var gradientScheme = [
		'rgba(0, 0, 255, 0)',
		'rgba(0, 60, 200, 1)',
		'rgba(0, 120, 120, 1)',
		'rgba(125, 125, 125, 0)',
		'rgba(125, 120, 60, 0)',
		'rgba(200, 60, 0, 0)',
		'rgba(255, 0, 0, 1)'
		];
	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: heatmapPoints,
		radius: 15, //gradient, radius, opacity, maxIntensity, and dissipating.
		gradient: gradientScheme
	});
	
	/*
	center: new google.maps.LatLng(41.3854, 2.1822),
	var trafficLayer = new google.maps.TrafficLayer();
	trafficLayer.setMap(map);
	trafficLayer.setMap(null);
	var transitLayer = new google.maps.TransitLayer();
	transitLayer.setMap(map);
	var bicyclingLayer = new google.maps.BicyclingLayer ();
	bicyclingLayer.setMap(map);
	
	var weatherLayer = new google.maps.weather.WeatherLayer({
	temperatureUnits : google.maps.weather.TemperatureUnit.CELCIUS  //google.maps.weather.TemperatureUnit.FAHRENHEIT
	});
	weatherLayer.setMap(map);
	var cloudLayer = new google.maps.weather.CloudLayer();
	cloudLayer.setMap(map);
	var panoramioLayer = new google.maps.panoramio.PanoramioLayer();
	panoramioLayer.setMap(map);
	
	*/
	
	
	
  
	
	var panMarker = new google.maps.Marker({
		position: new google.maps.LatLng(-0.35087366138498016, 36.9305419921875),
		map: map,
		title:'Custom Marker',
		draggable:true,
		icon:'http://maps.google.com/mapfiles/kml/pal2/icon5.png'
	});
		panMarker.setMap(map);
	/*
	var extraIcon = L.ExtraMarkers.icon({
	icon: 'fa-glyphicon',
	extraClasses: 'glyphicon glyphicon-plus-sign',
	iconColor: 'white',
    markerColor: 'cyan',
    shape: 'star',
    prefix: 'fa'
  });
  
  */
	var infoMarker = new google.maps.Marker({
		position: new google.maps.LatLng(-1.0375, 38.2709),
		map: map,
		title:'info Window | Popup Marker',
		draggable:true,
		icon:'http://maps.google.com/mapfiles/kml/pal2/icon2.png'
	});
	var infoWindow = new google.maps.InfoWindow({
		content: '<span id="info-popup">Hello <b>Kinyua Jason Muriki</b>.</span>'
	});
	google.maps.event.addListener(infoMarker, 'click', function(){
		infoWindow.open(map, infoMarker);
	});
	
	  google.maps.event.addListener(panMarker, 'dragend', function(evt){
		  var lat = evt.latLng.lat().toFixed(4);
		  var lng = evt.latLng.lng().toFixed(4);
		  console.log("\n\["+lat+", "+lng+"\],");

	});
	var markerArray = [-1.1583, 35.6122 ,
-1.4988, 35.7550 ,-1.8392, 36.1285 ,-1.7843, 36.5131 ,-1.3780, 36.4471 ,-0.9606, 36.2604 ,
-1.2352, 36.0736 ,-0.8507, 36.0516 ,-0.9386, 35.8539 ,-0.7189, 35.8429 ,-0.7409, 36.1066 ,
-1.2352, 36.2384 ,-1.1253, 36.0187 ,-1.1693, 35.7660 ,-1.5647, 35.7660 ,-1.8392, 35.9637 ,
-1.7733, 36.2714 ,-1.1803, 38.5455 ,-1.6525, 38.6224 ,-1.4219, 37.9962 ,-2.0808, 37.9303 ,
-1.9271, 38.3698 ,-1.8172, 38.0841 ,-1.3999, 38.0841 ,-0.8068, 38.3148 ,-0.8178, 39.5343 ,
-1.3780, 39.4464 ,-1.7294, 39.1937 ,-2.2564, 38.9191 ,-2.6735, 38.6664 ,-2.1906, 38.3038 ,
-2.5967, 39.0289 ,-2.6406, 39.7760 ,-2.0698, 39.8859 ,3.2331, 39.8969 ,-3.5292, 39.2047 ,
-3.7265, 38.9630 ,-2.9369, 39.2596 ,2.3881, 39.6442 ,2.4211, 38.9191 ,-3.1124, 38.9081 ,
-3.5182, 38.8751 ,-3.1343, 39.3585 ,-2.4321, 39.3036 ,-1.7184, 39.6442 ,-1.3889, 40.1825 ,
-1.3670, 39.5892 ,-0.9056, 38.9410 ,-0.6969, 39.2816 ,-1.0155, 39.6771 ,-1.3450, 39.6222 ,
-1.1253, 40.1276 ,-0.3783, 40.2814 ,-0.3564, 39.7760 ,0.0268, 39.3036 ,-0.0378, 38.4027 ,
-0.4113, 38.2819 ,0.3797, 37.9962 ,0.3358, 37.5787 ,0.1051, 37.6776 ,0.1929, 37.9083 ,

-0.0048, 37.6666 ,-0.3344, 37.8094 ,-0.8837, 38.3258 ,-1.0375, 38.2709 ,-1.0375, 38.8092 ,

-1.1363, 38.4796 ,-0.3234, 39.4574 ,0.1820, 40.0397 ,0.1380, 40.4572 ,0.3138, 39.9188 ,

0.5006, 39.2926 ,

1.1816, 38.6664 ,

1.1816, 38.1281 ,

0.6653, 37.8754 ,

0.6544, 37.5238 ,

0.9949, 37.1503 ,

1.5990, 37.3590 ,

1.4562, 37.9193 ,

1.0608, 37.5677 ,

1.3025, 37.3260 ,

2.0821, 37.7325 ,

2.4883, 37.7765 ,

2.3456, 37.4359 ,

2.2249, 36.6449 ,

2.0053, 36.2054 ,

2.6749, 35.9308 ,

3.1357, 35.6671 ,

3.6183, 35.4803 ,

4.1554, 35.4803 ,

4.1115, 35.2167 ,

3.5196, 35.0848 ,

2.7298, 35.0848 ,

2.4115, 35.6891 ,

1.9504, 36.2494 ,

1.7198, 36.6669 ,

2.2797, 37.2491 ,

2.8834, 36.9745 ,

3.3770, 37.3370 ,

2.7627, 38.1281 ,

2.2468, 38.1061 ,

1.4233, 38.8641 ,

1.4233, 39.6222 ,

1.9284, 39.4135 ,

2.0821, 39.2267 ,

1.5990, 38.7982 ,

1.2805, 39.1718 ,

2.1041, 40.0726 ,

2.9273, 40.3802 ,

1.8845, 40.6659 ,

1.1706, 40.6769 ,

1.0828, 40.3363 ,

1.2366, 39.8969 
];
	
	
		
	function addMarker(location, myLabel, infoContent){
	var marker = new google.maps.Marker({
		title: "Auto Marker",
		icon: "http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png",
		animation:google.maps.Animation.DROP
	});
	 var markerLabel = new MapLabel({
          text: myLabel,
          position: new google.maps.LatLng(location),
          map: map,
          fontSize: 10,
          align: 'center'
     });
		
        marker.bindTo('map',markerLabel);
        marker.bindTo('position', markerLabel);
		marker.setDraggable(false);
		marker.setMap(map);
		
	var infowindow = new google.maps.InfoWindow({
		content: infoContent
	});
	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map, marker);
	});
	}	
	for(count = 0; count<markerArray.length; count++){
	if(count % 2 == 0 || count == 0){
	var latt = markerArray[count];
	}
	else if(count % 2 == 1 || count == 1){
	var lngg =markerArray[count];
	var location = {lat: latt, lng: lngg};
	var label = "Marker_"+count;
	var content = "<h3>Marker Location </br><b>{Lat: "+latt+" Lng : "+lngg+" }</b></h3>";
	addMarker(location, label, content);
	}
	else{
		console.log("Count Error : "+count);
	}
	}
	
        var mapLabel = new MapLabel({
          text: 'label',
          position: new google.maps.LatLng(-0.1971,37.8534),
          map: map,
          fontSize: 25,
          align: 'right'
        });
        mapLabel.set('position', new google.maps.LatLng(-0.1971,37.8534));

        var marker = new google.maps.Marker();
        marker.bindTo('map', mapLabel);
        marker.bindTo('position', mapLabel);
        marker.setDraggable(false);
		
		var infowindow = new google.maps.InfoWindow({
		content: '<div style="width:200px;"><b>Popup Content :</b></br>labeled Marker Popup.</div>'
		});
		google.maps.event.addListener(marker, 'click', function(){
			infowindow.open(map, marker);
		});
        var changeAlign = document.getElementById('change-align');
        google.maps.event.addDomListener(changeAlign, 'click', function() {
          mapLabel.set('align', document.getElementById('align').value);
        });

       
        var changeText = document.getElementById('change-text');
        google.maps.event.addDomListener(changeText, 'click', function() {
          mapLabel.set('text', document.getElementById('text').value);
        });

	var pointCloud = [
	
[-0.4223, 37.1393],[-0.6695, 37.2876],[-0.5266, 37.5403],[-0.5486, 37.8204],
[-0.4827, 38.0017],[-0.1257, 38.1665],[0.2973, 38.2324],[0.4896, 38.5950], [0.7203, 38.8257]

	];
	
	var linepath = [];
	for(var i = 0; i<pointCloud.length; i++){
		var point = new google.maps.LatLng(pointCloud[i][0], pointCloud[i][1]);
		linepath.push(point);
	}
	var lineOptions = {
		path: linepath,
		strokeWeight: 8,
		strokeColor: "green",
		strokeOpacity: 0.7
	}
	var polyLine = new google.maps.Polyline(lineOptions);
	polyLine.setMap(map);
	
	var shapeCloud = [
	[-0.5816, 36.2823],[-0.2026, 35.6287],[0.2204, 35.7660], [0.9070, 35.8209],[1.4288, 36.1066], 
[1.9778, 37.2217], [0.9619, 38.3148],[-0.2465, 37.5568],[0.1490, 38.1335],[-0.4278, 37.7380]        	
	];
	var areaSweep = [];
	for(var i = 0; i<shapeCloud.length; i++){
		var point = new google.maps.LatLng(shapeCloud[i][0], shapeCloud[i][1]);
		areaSweep.push(point);
	}
	var polygonOptions = {
		paths: areaSweep,
		strokeColor: "blue",
		strokeWeight: 3,
		strokeOpacity: 0.6,
		fillColor: "violet",
		fillOpacity: 0.42
	}
	var polygon = new google.maps.Polygon(polygonOptions);
	polygon.setMap(map);
	
	var cities = [{
	center: new google.maps.LatLng(0.9455, 38.6224),
	population : 4630000
	},
	{
	center: new google.maps.LatLng(-1.6361, 40.8856),
	population : 1371000
	},
	{
	center: new google.maps.LatLng(-1.7569, 37.5238),
	population : 3401000
	}
	];
	
	var boxSW = new google.maps.LatLng(-0.9661, 34.304);
	var boxNE = new google.maps.LatLng(0.3632, 35.3815);
	for (var i=0; i < cities.length; i++) {
	var circleOptions = {
	fillColor: '#FFFF00',
	fillOpacity: 0.55,
	strokeColor: '#FF0000',
	strokeOpacity: 0.7,
	strokeWeight: 1,
	center: cities[i].center,
	radius: cities[i].population / 50
	};
	cityCircle = new google.maps.Circle(circleOptions);
	cityCircle.setMap(map);
	}
	
	var bounds = new google.maps.LatLngBounds(boxSW,boxNE);
		var rectOptions = {
		fillColor: 'magenta',
		fillOpacity: 0.45,
		strokeColor: 'red',
		strokeOpacity: 0.1,
		strokeWeight: 1,
		bounds: bounds
	}
	var rect = new google.maps.Rectangle(rectOptions);
	rect.setMap(map);
	var square = {
    path: 'M -2,-2 2,-2 2,2 -2,2 z', // 'M -2,0 0,-2 2,0 0,2 z',
    strokeColor: '#F00',
    fillColor: '#F00',
    fillOpacity: 1,
    scale: 5
  };
  var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.6,
    scale: 0.2,
    strokeColor: 'gold',
    strokeWeight: 2
  };

	var marker = new google.maps.Marker({
    position: new google.maps.LatLng(-2.0863, 40.6714),
    icon: square,
	 label: {
      text: "X",
      fontWeight: "bold"
    }
  });
  marker.setMap(map);
  
   var marker = new google.maps.Marker({
               position: new google.maps.LatLng(-1.6580, 40.8856),
               
               icon: {
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 5,
                  strokeWeight:2,
                  strokeColor:"#B40404"
               },
               
               animation:google.maps.Animation.BOUNCE,
               draggable:true,
               map: map
            });
	var linePoints = [
	[-3.1179, 39.7321],[-2.3936, 40.2814],[-1.7678, 40.2814], [-1.2626, 40.7758],[-0.7793, 40.6219], [-0.0872, 40.8087],[1.9229, 40.8417]
	];
	var linePath = [];
	for(count=0; count<linePoints.length; count++){
		var pointSpec = new google.maps.LatLng(linePoints[count][0], linePoints[count][1]);
		linePath.push(pointSpec);
	}
	var arrow = {
		strokeColor: "red",
		scale: 6,
		fillColor: "violet",
		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
	};
	var lineOptions = {
		path: linePath,
		icons: [{ icon: arrow,
				  offset: '100%'
				}],
		strokeWeight: 4,
		strokeColor: "blue",
		strokeOpacity: 0.75,
		map: map
	};
	var line = new google.maps.Polyline(lineOptions);
	animateArrow(line);
	function animateArrow(line){
		count = 0;
	window.setInterval(function(){
		count=(count+1)%200;
		var icons = line.get('icons');
		icons[0].offset = (count / 2) + '%';
		line.set('icons', icons);
	}, 15);
	
	}
	
	
	var georssLayer;
	var kmlLayer;
	function addGeorssLayer(){
		georssLayer = new google.maps.KmlLayer(
		'http://eartquake.usgs.gov/earthquakes/feed/v1.0/summery4.5_month.atom'
		);
		georssLayer.setMap(map);
	}
	function addKmlLayer(){
	kmlLayer = new google.maps.KmlLayer(
	'http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml'
	);	
	console.log("KML layer set");
	kmlLayer.setMap(map);
	}
	function cleanKml(){
		if(kmlLayer != undefined){
			kmlLayer.setMap(null);
			kmlLayer = null;
		}
		console.log("KML layer = null.");
	}
	function cleanGeoRss(){
		if(georssLayer != undefined){
			georssLayer.setMap(null);
			georssLayer = null;
			console.log("GeoRSS Layer Undefined");
		}
	}
	
	function drawGeometry(geometry){
		console.log("Adding Geojson Layer")
		if(geometry.type == 'Point'){
			var coord = new google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0]);
			var marker = new google.maps.Marker({
				position: coord,
				map: map,
				title: 'Geometry marker'
			});
		}
		else if(geometry.type == 'LineString'){
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
	
	
	$(document).ready(function(){
		$('#addGeoJson').click(function(){
			$.getJSON('libs/data/major_towns.geojson', function(data){
			
			$.each(data.features, function(key, val){
				drawGeometry(val.geometry);
			});
		});
		});
		
		$('#setOSM').click(function(){
			 $(this).toggleClass("checked");
			 if($(this).hasClass("checked")){
				map.setMapTypeId('OSM');
			 }
			 else{
				map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
			 }
			
		});
		$('#overlayOSM').click(function(){
			$(this).toggleClass("checked");
			 if($(this).hasClass("checked")){
				map.overlayMapTypes.insertAt(1, osmMap);
			 }
			 else{
				map.overlayMapTypes.setAt(1, null);
			 }
		});
		$('#heatmap').click(function(){
			$(this).toggleClass("checked");
			 if($(this).hasClass("checked")){
				heatmap.setMap(map);
			 }
			 else{
				heatmap.setMap(null);
			 }
		});
		$("#kmlLayer").click(function(){
			$(this).toggleClass('checked');
			if($(this).hasClass('checked')){
				addKmlLayer();
			}
			else{
				cleanKml();
			}
		});
		$("#georssLayer").click(function(){
			$(this).toggleClass('checked');
			if($(this).hasClass('checked')){
				addGeorssLayer();
			}
			else{
				cleanGeoRss();
			}
		});
	});
	var blueStyle = [
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
	var blueBaseMap = new google.maps.StyledMapType(blueStyle, {name: "Blue_Map"});
	map.mapTypes.set('blue_baseMap', blueBaseMap);
	//map.setMapTypeId('blue_baseMap');
}

	
	google.maps.event.addDomListener(window, 'load', loadMap);