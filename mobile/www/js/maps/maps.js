angular.module('niteout.maps', ['niteout.location-services'])
.factory('Maps', ['GeoLocator', 'GoogleMaps', function (GeoLocator, GoogleMaps) {
  'use strict';
  
  var initialize = function () {
    return GeoLocator
            .getCurrentPosition()
            .then(function (location) { 
              var map = {};

              map.zoom = 13;
              map.center = [
                location.coords.latitude,
                location.coords.longitude
              ];
              

              return map;

              // // move Marker to updated location
              // $scope.userMarker = new google.maps.Marker();
              // $scope.userMaker.setPosition(loc);
              // $scope.userMaker.setMap(map);
            });
  };
  return {
    initialize: initialize
  };
}]);