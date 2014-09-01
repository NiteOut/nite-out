// map module
angular.module('nite-out.map', [])

// .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//     .state('nite-out.map', {
//       url: "/",
//       templateUrl: "map.html",
//       controller: function($scope, gmap) {
//         $scope.logPlaces = function(zipcode){
//           gmap.findPlaces(zipcode, gmap.map, 500);
//         };
//       }
//     })
// })
.controller('gmapController', function($scope, gmap){
  $scope.logPlaces = function(zipcode){
    gmap.findPlaces(zipcode, gmap.map, 15000);
  };
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

  var findPlaces = function(center, map, radius, cb){
    locations = [];
    console.log('in findPlaces', center, map, radius, cb);
    getLatLng(center, function(latLng){
      var center = new google.maps.LatLng(latLng.latitude, latLng.longitude);
      radius = radius || 15000;

      var request = {
        location: center,
        radius: radius,
        types: ['restaurant']
      };

      service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, function(results, status) {
        console.log(status);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            locations.push(place);
            //createMarker(results[i]);
          }
        }
        console.log(locations);
      });
    });
  };


  // produce google map latLng object from a zipcode
  // this is call to google api so i's asynchronous
  // getLatLng is primarily a helper for makeMap()
  var getLatLng = function(someAddress, cb){
    var latLng = {};
    // gecoder takes { address: string } as input
    someAddress = { address: someAddress };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(someAddress, function (response, status){
      if(status == google.maps.GeocoderStatus.OK){
        latLng.latitude = response[0].geometry.location.lat();
        latLng.longitude = response[0].geometry.location.lng();
        if(typeof cb === 'function'){
          cb(latLng);
          // latLng should be {
          //                  longitude: number
          //                   laatitude: number
          //                }
        } else {
          alert('address was not geocoded');
        }
      }
    });
  };

  // Factory interface for producing a map on the DOM
  // location is expected to be a string
  var makeMap = function(location, cb){
    getLatLng(location, function(latLng){
      initialize(latLng, function(map){
        // passing access to map object
        cb(map);
      });
    });
  };

  // gmap factory api
  return {
    makeMap: makeMap,
    findPlaces: findPlaces,
    locations: locations,
    map: 'wtf'
  };
})

.directive('gMap', function gMapDirective(gmap){

  return {
    restrict: 'E',
    scope: {
      event: "@location",
      visible: "@"
    },
    templateUrl: 'map.html',

    link: function(scope, element){
      // async operation
      gmap.makeMap(scope.event, function(map){
        // I think I'm giving the gmap factory a reference to this particular map object
        gmap.map = map;
        // scope visible comes from directive from html
        if(scope.visible !== 'true'){
          element.addClass('invisible');
        }
      });
    }
  };
});