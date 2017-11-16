     
class Venue {
	constructor(venueJSON) {
		this.name = venueJSON.venue.name;
		this.rating = venueJSON.venue.rating;
		this.url = venueJSON.venue.url;
		this.lat = venueJSON.venue.location.lat;
		this.lng = venueJSON.venue.location.lng;
		this.location = venueJSON.venue.location;
		this.phone = venueJSON.venue.contact.phone;
	}
}

async function retrieveVenuesFromFoursquareAPI() {
	const client_id = 'YDZIVXV0U0ZE3WEJKTXTV3QMTS2KR0JJ11DLPLG3J4QA002D';
	const client_secret = 'YGNIWZJE1TWNVZEHFML1322S4PA5BWBIQWZLIIAOYIQ3QKMX';
	const api_version = '20170801';
	
	// https://developer.foursquare.com/docs/api/venues/explore
	const exploreAPI = 'https://api.foursquare.com/v2/venues/explore';
	const nearCity = 'Ann Arbor, MI';
	const venueRecommendationRequestURL = `${exploreAPI}?client_id=${client_id}&client_secret=${client_secret}&v=${api_version}&near=${nearCity}`;

	let response = await fetch(venueRecommendationRequestURL);
	let json = await response.json();
	
	let venues = [];
	for (const venue of json.response.groups[0].items) {
		venues.push(new Venue(venue));
	}
	return venues;
}



class GoogleMap {
	constructor() {
		this.map = new google.maps.Map(document.getElementById('map'), {
					// ann arbor, MI
				  center: {lat: 42.2806678, lng: -83.7376554},
				  zoom: 16,
				  disableDefaultUI: true,
				});
		this.marker = [];
		//this.infoWindow = new google.maps.infoWindow();
	}

	setMarker(venue) {
		//console.log(venue);
		let marker = new google.maps.Marker({
			position: venue.location,
			title: venue.name,
			map: this.map
		});
		//marker.addListener();
		this.marker.push(marker);
	}

}


async function main() {
	venues = await retrieveVenuesFromFoursquareAPI();
	console.log(venues);
 	// Activates knockout.js
    ko.applyBindings(venues);

    googleMap = new GoogleMap();

    for (const venue of venues) {
    	googleMap.setMarker(venue);
    }

}

main()
