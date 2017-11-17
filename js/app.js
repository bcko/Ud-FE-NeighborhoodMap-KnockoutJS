// Venue class is used to store relevant data retrieved from Foursquare API     
class Venue {
	constructor(venueJSON) {
		this.name = venueJSON.venue.name;
		this.rating = venueJSON.venue.rating;
		this.url = venueJSON.venue.url;
		this.lat = venueJSON.venue.location.lat;
		this.lng = venueJSON.venue.location.lng;
		this.location = venueJSON.venue.location;
		this.phone = venueJSON.venue.contact.phone;

		this.marker; // will be set later
		this.infoWindowContent = `<h1> ${this.name} </h1>
				<p>
					rating : ${this.rating} </br>
					website : ${this.url} </br>
					phone number: ${this.phone} </br>
					retrieved from Foursquare
				</p>
		`;
	}
}



// I cannot use this because Udacity system doesn't recognize async/await. 
// asynchronously retrieve venues from foursquare exploreAPI
/*
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
*/



// GoogleMap class has all objects and methods related to google map.
class GoogleMap {
	// initializes google map, marker array, and infoWindow
	constructor() {
		this.map = new google.maps.Map(document.getElementById('map'), {
					// ann arbor, MI
				  center: {lat: 42.2806678, lng: -83.7376554},
				  zoom: 14,
				  disableDefaultUI: true,
				});
		// https://developers.google.com/maps/documentation/javascript/infowindows
		//  If you only need one info window at a time, you can create just one InfoWindow object and open it at different locations or markers upon map events, such as user clicks.
		this.infoWindow = new google.maps.InfoWindow({});
	}

	setMarker(venue) {
		let marker = new google.maps.Marker({
			position: venue.location,
			title: venue.name,
			// https://developers.google.com/maps/documentation/javascript/markers#animate
			animation: google.maps.Animation.DROP, 
			map: this.map,
		});

		// adding marker bounce
		marker.addListener('click', () => {
			marker.setAnimation(google.maps.Animation.BOUNCE);
			// bounce stops after 1 second
	    	setTimeout(() => marker.setAnimation(null), 1000); 
		});		

		// attach infowindow
		marker.addListener('click', () => {
			this.infoWindow.open(this.map, marker);
			this.infoWindow.setContent(venue.infoWindowContent);
			this.map.setCenter(venue.location);
		});

		return marker;
	}


}

// DrawerUI class is used to control drawer in material component
// https://material.io/components/web/catalog/drawers/
class DrawerUI {
	constructor() {
		this.drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
		document.querySelector('.mdc-toolbar__menu-icon').addEventListener('click', () => this.drawer.open = true);
	}
	openDrawer() {
		this.drawer.open = true;
	}
	closeDrawer() {
		this.drawer.open = false;
	}
}

// Knockout.js ViewModel
function VenueViewModel(venues) {
	"use strict";
	let self = this;

	self.googleMap = new GoogleMap();
	 // we want to show all venues in the beginning
	self.visibleVenues = ko.observableArray([]);

    self.venues = venues;
    for (const venue of self.venues) {
    	self.visibleVenues.push(venue);
    	venue.marker = self.googleMap.setMarker(venue);

    }

	// initialize drawerUI class
	self.drawerUI = new DrawerUI();

	// In drawer UI, when a venue is clicked, it will close the drawer and open the venue's infowindow.
	self.openInfoWindow = function(venue) {
		self.drawerUI.closeDrawer();
		google.maps.event.trigger(venue.marker, 'click');
	};

	// input received from search UI
	self.filterInput = ko.observable('');

	self.filterLocations = function() {
		// remove all visible Venues
		self.visibleVenues.removeAll();

		for (let venue of self.venues) {
			// check to see if venue's name contains filterinput 
			if (venue.name.toLowerCase().includes(self.filterInput().toLowerCase())) {
				self.visibleVenues.push(venue);
				venue.marker.setMap(self.googleMap.map);
			} else {
				venue.marker.setMap(null);
			}
		}
	};
}

function retrieveVenuesFromFoursquareAPI2() {
	const client_id = 'YDZIVXV0U0ZE3WEJKTXTV3QMTS2KR0JJ11DLPLG3J4QA002D';
	const client_secret = 'YGNIWZJE1TWNVZEHFML1322S4PA5BWBIQWZLIIAOYIQ3QKMX';
	const api_version = '20170801';
	
	// https://developer.foursquare.com/docs/api/venues/explore
	const exploreAPI = 'https://api.foursquare.com/v2/venues/explore';
	const nearCity = 'Ann Arbor, MI';
	const venueRecommendationRequestURL = `${exploreAPI}?client_id=${client_id}&client_secret=${client_secret}&v=${api_version}&near=${nearCity}`;

	return fetch(venueRecommendationRequestURL).then((response) => { return response.json(); 
	}).then((json) => json.response.groups[0].items);
}

function initMap() {
	"use strict";
	// autoinitialize all material UI components
	// https://material.io/components/web/catalog/auto-init/
	window.mdc.autoInit();

	// retrieves 30 venue recommendations from Foursquare API
    retrieveVenuesFromFoursquareAPI2()
    .then((venuesJSON) => {
    	let venues = [];
    	for (const venueJSON of venuesJSON) {
			venues.push(new Venue(venueJSON));
		}
		ko.applyBindings(new VenueViewModel(venues));
    });
}