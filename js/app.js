let map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40.7754483, lng: -73.9641723},
	  zoom: 14
	});
}