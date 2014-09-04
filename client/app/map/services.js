'use strict';

angular.module('nite-out.mapFactory', [])

.factory('Mapper',['$q', function($q){
//////////////////////////////////////////////////////////////////////////////////////////
//  map.html is set to render {{ object.name }} and {{ object.vicinity }} from Mapper.locations via controller.
//  set Mapper.locations with an array by Mapper.setLocations() or just Mapper.locations = [{}...].
//  Mapper.findPlace('place type') will also set Mapper.locations
//////////////////////////////////////////////////////////////////////////////////////////

  // hash of locations set by some other controller
  // { name: string, vicinity: string }

  // the center point of the map or selected event
  var pointOfInterest = null;

  var gMap = null;

  // setup options for the angular-google-maps directive
  // needs to be to be implemented in a controller that has angular-google-map in it's scope
  var init = {
    // each property has to be assigned to it's corresponding attribute in the directive
    // 'center' is required
    center: {
        // Hack Reactor
        latitude: 37.7835565,
        longitude: -122.40867880000002
    },

    zoom: 13,

    control: {
      // angular-google-maps adds properties via magic
      // getGMap() gets the map instance
    },

    options: {
      disableDefaultUI: true,
      scrollwheel: false,
    },

    events: {
      // When map is loaded then add reference of google map instance to the Mapper.gMap
      // FYI the google.map instance has more points of interface over the angular-google-map directive
      tilesloaded: function (mapInstance) {
        if(!gMap){
          gMap = mapInstance;
          pointOfInterest = gMap.getCenter();
        }
      }
    }
  };

  // google maps only accept latitude/longitude objects so geocoding an address is necessary.
  // async Geocoder() call is promisified using $q
  var getLatLng = function(addressString){
    var geolocation = {};
    // gecoder takes { address: string } as optional request object property
    var request = { address: addressString };
    var geocoder = new google.maps.Geocoder();

    var defer = $q.defer();

    geocoder.geocode(request, function (response, status){
      if(status === google.maps.GeocoderStatus.OK){
        // some functions look for a {lng: #, lat: #} and others a {longitude: # latitude: #} so this object stores both.
        geolocation.lat = geolocation.latitude = response[0].geometry.location.lat();
        geolocation.lng = geolocation.longitude = response[0].geometry.location.lng();
        defer.resolve(geolocation);
      } else {
        defer.reject(geolocation);
      }
    });

    return defer.promise;

  };

  var setCenter = function(addressString){
    if(gMap){
      getLatLng(addressString).then(function (geolocation){
        gMap.setCenter(geolocation);
      });
    } else {
      alert('wait for google map tiles to load entirely');
    }
  };

  return {
    init: init,
    gMap: gMap,
    setCenter: setCenter,
    getLatLng: getLatLng
  };

}]);