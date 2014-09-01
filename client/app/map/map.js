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

.controller('mapController', function($scope, Mapper, Movies){
  // var movies = Movies.getTheaters();
  var places = [
    {
      title: 'Buffet', address: '94040'
    },
    {
      title: 'foods', address: 'San Francisco, CA'
    }
  ];
  $scope.setCenter = function(address){
    // async Geocoder API call
    Mapper.setCenter(address, function (geolocation){
      $scope.map = {
        center: geolocation,
        zoom: 12
      }
    });
  }
  $scope.places = places;
  $scope.map = {
    center: {
        // Hack Reactor
        latitude: 37.7835565,
        longitude: -122.40867880000002
    },
    zoom: 14
  };
});



//   var findPlaces = function(center, map, radius, cb){
//     locations = [];
//     console.log('in findPlaces', center, map, radius, cb);
//     getLatLng(center, function(latLng){
//       var center = new google.maps.LatLng(latLng.latitude, latLng.longitude);
//       radius = radius || 15000;

//       var request = {
//         location: center,
//         radius: radius,
//         types: ['restaurant']
//       }

//       service = new google.maps.places.PlacesService(map);

//       service.nearbySearch(request, function(results, status) {
//         console.log(status);
//         if (status == google.maps.places.PlacesServiceStatus.OK) {
//           for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             locations.push(place);
//             //createMarker(results[i]);
//           }
//         }
//         console.log(locations);
//       });
//     });
//   };




  // gmap factory api
//   return {
//     makeMap: makeMap,
//     findPlaces: findPlaces,
//     locations: locations,
//     map: 'wtf'
//   }
// })
