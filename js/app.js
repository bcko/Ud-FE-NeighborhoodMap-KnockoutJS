FoursquareAPI = {
	venue_recommendation : 'https://api.foursquare.com/v2/venues/explore',
	client_id : 'YDZIVXV0U0ZE3WEJKTXTV3QMTS2KR0JJ11DLPLG3J4QA002D',
	client_secret : 'YGNIWZJE1TWNVZEHFML1322S4PA5BWBIQWZLIIAOYIQ3QKMX',
	v : '20170801', // version number
}
Object.freeze(FoursquareAPI);


let venues;
// fetch api is awesome!
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.foursquare.com/docs/api/venues/explore
fetch(`${FoursquareAPI.venue_recommendation}?client_id=${FoursquareAPI.client_id}&client_secret=${FoursquareAPI.client_secret}&v=${FoursquareAPI.v}&near=Ann Arbor, MI`)
	.then((response) => {
		return response.json();
	}).then((recJSON)=> {
		venues = recJSON.response.groups[0].items;
	});
		


// https://developers.google.com/maps/documentation/javascript/tutorial
function initMap() {
	"use strict";
	let map = new google.maps.Map(document.getElementById('map'), {
		// ann arbor, MI
	  center: {lat: 42.2806678, lng: -83.7376554},
	  zoom: 16,
	  disableDefaultUI: true,
	});

}


const VenueViewModel = function() {


};


/*
// Add markers to the map
function initMarkers(map) {
	"use strict";
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
	// The for...of statement creates a loop iterating over iterable objects (including Array, Map, Set, String, TypedArray, arguments object and so on), invoking a custom iteration hook with statements to be executed for the value of each distinct property
	for (const restaurant of restaurants) {
		const marker = new google.maps.Marker({
			map: map,
			position: {lat: restaurant.lat, lng: restaurant.lng},
			title: restaurant.name,
		});
	}

}
*/