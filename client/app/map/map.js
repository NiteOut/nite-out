'use strict';

// map module
angular.module('nite-out.map', ['ui.router','google-maps'])

.config(function($stateProvider) {
  $stateProvider
    .state('main.map', {
      url: "/map",
      templateUrl: "app/map/map.html",
      controller: 'mapController'
    });
})

.factory('gmap', function(){

  var locations = [];
  var mapDomID = 'nite-out-map';

  // initialize takes a longitude and latitude to produce a map which it appends to the DOM with hard coded mapDomID.
  // place = (google longitude/latitude object)
  var initialize = function(latLng, cb){
    if(google){
      var pointOfInterest = new google.maps.LatLng(latLng.latitude, latLng.longitude);
      var clientLocation;
      var map;
      // If HTML5 navigator avaliable then check client side longitude and latitude
      if (navigator.geolocation) {

        // access geolocation
        navigator.geolocation.getCurrentPosition(function(position) {
          // Make a coordinate object for google maps
          clientLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        });
      }

      pointOfInterest = pointOfInterest || clientLocation || new google.maps.LatLng(37.783587, -122.408971);// hack reactor is the default

      // Initialize the Google Maps API v3
      map = new google.maps.Map(document.getElementById(mapDomID), {
        zoom: 13,
        center: pointOfInterest,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        maxZoom: 16,
        minZoom: 12
      });

      new google.maps.Marker({
        position: pointOfInterest,
        map: map, // google map instance
        icon: "http://maps.google.com/mapfiles/ms/micons/movies.png"//'client/app/map/cinema.png'
      });

      // give access to map object
      cb(map);
    }
  };
})

.controller('mapController', function($scope, Mapper){
  $scope.places;

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  // setting map options through the google-map directive interface
  $scope.setCenter = function(address){
    // async Geocoder API call
    Mapper.setCenter(address);
  };

  $scope.select = function(place){
    $scope.setCenter(place.vicinity);
    window.scrollTo(0,0);
    console.log("you selected", place.name);
  };

  // takes args: ("type of establishment", optional radius in meters, optional callback())
  $scope.renderListOfPlaces = function(){
    $scope.places = Mapper.getLocations();
  };

  window.doStuff = function(){
    $scope.$apply(function(){
      $scope.places = Mapper.getLocations();
    });
    $scope.renderListOfPlaces();
  };
});