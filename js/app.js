class Venue {
	constructor(venueJSON) {
		this.name = venueJSON.venue.name;
		this.rating = venueJSON.venue.rating;
		this.url = venueJSON.venue.url;
		this.lat = venueJSON.venue.location.lat;
		this.lng = venueJSON.venue.location.lng;
		this.phone = venueJSON.venue.contact.phone;
		this.marker;
	}
	setMarker(marker) {
		this.marker = marker;
	}
}

class FoursquareAPI {
	constructor() {
		this.client_id = 'YDZIVXV0U0ZE3WEJKTXTV3QMTS2KR0JJ11DLPLG3J4QA002D';
		this.client_secret = 'YGNIWZJE1TWNVZEHFML1322S4PA5BWBIQWZLIIAOYIQ3QKMX';
		this.v = '20170801';
	}

	getVenueRecommendation() {
		const exploreAPI = 'https://api.foursquare.com/v2/venues/explore';
		const near = 'Ann Arbor, MI';
		const venueRecommendationRequestURL = `${exploreAPI}?client_id=${this.client_id}&client_secret=${this.client_secret}&v=${this.v}&near=${near}`;
		const venues = [];
		this.fetchVenues(venues, venueRecommendationRequestURL)
		return venues;
		
	}
	async fetchVenues(venues, venueRecommendationRequestURL) {
		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		// https://developer.foursquare.com/docs/api/venues/explore
		return fetch(venueRecommendationRequestURL)
			.then(response => response.json())
			.then((recJSON) => {
				for (const venue of recJSON.response.groups[0].items) {
					venues.push(new Venue(venue));
				}
			});
	}

}

const foursquareAPI = new FoursquareAPI();
const venues = foursquareAPI.getVenueRecommendation();
console.log(venues[1]);
initMap();

// https://developers.google.com/maps/documentation/javascript/tutorial
function initMap() {
	"use strict";
	let map = new google.maps.Map(document.getElementById('map'), {
		// ann arbor, MI
	  center: {lat: 42.2806678, lng: -83.7376554},
	  zoom: 16,
	  disableDefaultUI: true,
	});
	for (const venue of venues) {
		console.log(venue);
	}

	//initMarkers(map);

}


const VenueViewModel = function() {


};



// Add markers to the map
function initMarkers(map) {
	"use strict";
	
	console.log('hello');
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
	// The for...of statement creates a loop iterating over iterable objects (including Array, Map, Set, String, TypedArray, arguments object and so on), invoking a custom iteration hook with statements to be executed for the value of each distinct property
	for (const venue in venues) {
		console.log(venues);
		venue.marker = new google.maps.Marker({
			map: map,
			position: {lat: venue.lat, lng: venue.lng},
			title: venue.name,
		});
	}

}
