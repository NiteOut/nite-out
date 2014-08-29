// map module
angular.module('nite-out.map', [])

// configure routes
// .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//     .state('nite-out.map', {
//       url: "/",
//       templateUrl: "map-list.html",
//       controller: function($scope) {
//         // $scope.stuff = [];
//       }
//     })
// });
.factory('gmap', function(){

  var locations = [];

  // initialize takes a longitude and latitude to produce a map which it appends to the DOM with hard coded mapDomID.
  // place = (google longitude/latitude object)
  var initialize = function(latLng){
    if(google){
      var mapDomID = 'nite-out-map';
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
    }
  }
  // this is like $(document).ready
  // google.maps.event.addDomListener(window, 'load', initialize);

  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);


  // produce google map latLng object from a zipcode
  // this is call to google api so i's asynchronous
  // getLatLng is primarily a helper for makeMap()
  var getLatLng = function(someAddress, cb){
    console.log('in getlatLng');
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
        } else {
          alert('address was not geocoded');
        }
      }
    });
  };

  var makeMap = function(location){
    console.log('in make map');
    getLatLng(location, function(latLng){
      initialize(latLng);
    });
  };

  // gmap factory api
  return {
    makeMap: makeMap,
    locations: locations
  }
})

.directive('gMap', function gMapDirective(gmap){

  return {
    restrict: 'EA',
    scope: {event: "@location"},
    templateUrl: 'map.html',
    // controller: 'mapController',
    // controllerAs: 'map',

    link: function($scope){
      console.log($scope);
      gmap.makeMap($scope.event);
    }
  };
});

// <g-map event="{{search.value}}"></g-map>
