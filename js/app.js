// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
/*
First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. 
Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode. 
Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.
*/
"use strict";

const locations = [
{}

] 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed
Object.freeze(locations)

let map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40.7754483, lng: -73.9641723},
	  zoom: 14
	});
}