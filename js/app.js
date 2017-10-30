// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
/*
First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. 
Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode. 
Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.
*/
/*jshint strict:false */
"use strict";


// location lattitude and longitude retrieved from google maps (don't forget to visit these restaurants if you ever visit Ann Arbor)
const restaurants = [
{
	name: "Sadako Japanese Restaurant",
	lat: 42.2766225,
	lng: -83.7379937,
},
{
	name: "Angelo's",
	lat: 42.2809213,
	lng: -83.7420355,
},
{
	name: "Zingerman's Delicatessen",
	lat: 42.2808603,
	lng: -83.745936,
},
{
	name: "Gandy Dancer",
	lat: 42.2856173,
	lng: -83.7399049,
},
{
	name: "Pacific Rim By Kana",
	lat: 42.2797258,
	lng: -83.7471031,
},
];
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed
Object.freeze(restaurants);


let google;
// https://developers.google.com/maps/documentation/javascript/tutorial
function initMap() {
	let map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 42.2806678, lng: -83.7376554},
	  zoom: 16,
	});

	initMarkers(map);

}


// Add markers to the map
function initMarkers(map) {
	
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