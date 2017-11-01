
// location lattitude and longitude retrieved from google maps (don't forget to visit these restaurants if you ever visit Ann Arbor)
const restaurants = [
{
	name: "Sadako Japanese Restaurant",
	lat: 42.2766225,
	lng: -83.7379937,
	venueID: "4ad128eaf964a52022dd20e3",
},
{
	name: "Angelo's",
	lat: 42.2809213,
	lng: -83.7420355,
	venueID: "4a74742ef964a52037de1fe3",
},
{
	name: "Zingerman's Delicatessen",
	lat: 42.2808603,
	lng: -83.745936,
	venueID: "4aaa6549f964a520d25520e3",
},
{
	name: "Gandy Dancer",
	lat: 42.2856173,
	lng: -83.7399049,
	venueID : "4b291533f964a520559824e3",
},
{
	name: "Pacific Rim By Kana",
	lat: 42.2797258,
	lng: -83.7471031,
	venueID : "4b170b6ff964a5206dc123e3",
},
];
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed
Object.freeze(restaurants);

FoursquareAPI = {
	search_venue : 'https://api.foursquare.com/v2/venues',
	client_id : 'YDZIVXV0U0ZE3WEJKTXTV3QMTS2KR0JJ11DLPLG3J4QA002D',
	client_secret : 'YGNIWZJE1TWNVZEHFML1322S4PA5BWBIQWZLIIAOYIQ3QKMX',
	v : '20170801',
}
Object.freeze(FoursquareAPI);


// https://developers.google.com/maps/documentation/javascript/tutorial
function initMap() {
	"use strict";
	let map = new google.maps.Map(document.getElementById('map'), {
		// ann arbor, MI
	  center: {lat: 42.2806678, lng: -83.7376554},
	  zoom: 16,
	  disableDefaultUI: true,
	});

	initMarkers(map);

// fetch api is awesome!
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch(`${FoursquareAPI.search_venue}/4ad128eaf964a52022dd20e3?client_id=${FoursquareAPI.client_id}&client_secret=${FoursquareAPI.client_secret}&v=${FoursquareAPI.v}`)
	.then((response) => {
		return console.log(response.json());
	});
		



}

function RestaurantViewModel(){

}



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