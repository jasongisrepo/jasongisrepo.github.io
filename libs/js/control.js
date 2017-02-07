var map;
var chicago = {lat: 0.120850, lng: 36.50874};

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

function initMap() {
  map = new google.maps.Map(document.getElementById('myMapCtrl'), {
    zoom: 10,
    center: chicago,
	zoomControl: true,
	zoomControlOptions: {
	style: google.maps.ZoomControlStyle.LARGE
	}
  });

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map, chicago);

  centerControlDiv.index = 1;
  centerControlDiv.style['padding-top'] = '10px';
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
}

