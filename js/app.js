class Venue {
	constructor(venueJSON) {
		this.name = venueJSON.venue.name;
		this.rating = venueJSON.venue.rating;
		this.url = venueJSON.venue.url;
		this.lat = venueJSON.venue.location.lat;
		this.lng = venueJSON.venue.location.lng;
		this.phone = venueJSON.venue.contact.phone;

		this.marker = this.setMarker();
	}
	setMarker() {
		return new google.maps.Marker({ 
			position: {lat: this.lat , lng: this.lng},
			title: this.name,
		});
	}
	getInfoWindowContent() {
		
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
		const venues = this.fetchVenues(venueRecommendationRequestURL);
		return venues;
		
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
	async fetchVenues(venueRecommendationRequestURL) {
		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		// https://developer.foursquare.com/docs/api/venues/explore
		
		let response = await fetch(venueRecommendationRequestURL);
		let json = await response.json();
		let venues = [];

		for (const venue of json.response.groups[0].items) {
			venues.push(new Venue(venue));
		}
		return venues;
	}
}




// https://developers.google.com/maps/documentation/javascript/tutorial
async function initMap() {
	"use strict";
	let map = new google.maps.Map(document.getElementById('map'), {
		// ann arbor, MI
	  center: {lat: 42.2806678, lng: -83.7376554},
	  zoom: 16,
	  disableDefaultUI: true,
	});
	const foursquareAPI = new FoursquareAPI();
	let venues = await foursquareAPI.getVenueRecommendation();

	// now we have map declared, we can put markers on the map.
	for (const venue of venues) {
		venue.marker.setMap(map);
	}
}


const VenueViewModel = function() {


};

