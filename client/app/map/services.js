'use strict';

angular.module('nite-out.mapFactory', [])

.factory('Mapper',['$q', function($q){
//////////////////////////////////////////////////////////////////////////////////////////
//  map.html is set to render {{ object.name }} and {{ object.vicinity }} from Mapper.locations via controller.
//  set Mapper.locations with an array by Mapper.setLocations() or just Mapper.locations = [{}...].
//  Mapper.findPlace('place type') will also set Mapper.locations
//////////////////////////////////////////////////////////////////////////////////////////

  window.getStuff = function(type){
    findPlaces(type, function(){
      console.log('markers',MarkerList.markers);
      console.log('locations', locations);
    });
  };

  // hash of locations set by some other controller
  // { name: string, vicinity: string }
  var locations = null;

  var getLocations = function(){
    return locations;
  };

  var setLocations = function(array){
    locations = array;
  };

  // the center point of the map or selected event
  var pointOfInterest = null;

  var gMap = null;

  // an object to manager the storage and removal of map markers
  var MarkerList = {
    // storage hash
    markers: {},
    removeMarker: function(marker){
      delete this.markers[marker.id];
      marker.setMap(null);
    },
    clearMap: function(){
      angular.forEach(this.markers, function(marker, index){
        this.removeMarker(marker);
      }, this);
    },
    addMarker: function(options){
      options.map = gMap;
      options.draggable = false;
      options.animation = google.maps.Animation.DROP;
      options.icon = {
        url: options.icon,
        scaledSize: new google.maps.Size(20, 20),
      };
      var newMarker = new google.maps.Marker(options);
      this.markers[newMarker.place_id] = newMarker;
      return newMarker;
    }
  };

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
  var getLatLng = function(addressString){
    var geolocation = {};
    // gecoder takes { address: string } as optional request object property
    var request = { address: addressString };
    var geocoder = new google.maps.Geocoder();

    var defer = $q.defer();

    geocoder.geocode(request, function (response, status){
      if(status === google.maps.GeocoderStatus.OK){
        geolocation.latitude = response[0].geometry.location.lat();
        geolocation.longitude = response[0].geometry.location.lng();
        return defer.resolve(geolocation);
      }
    });

    return defer.promise;
    
  };

  var setCenter = function(addressString){
    if(gMap){
      getLatLng(addressString, function (geolocation){
        gMap.setCenter(geolocation);
      });
    } else {
      alert('wait for google map tiles to load entirely');
    }
  };

  // async call to google PlacesService API
  // supported location types: https://developers.google.com/places/documentation/supported_types
  var findPlaces = function(type, radius, cb){
    if(typeof arguments[0] === 'function'){
      cb = arguments[0];
      arguments[0] = null;
    }
    if(typeof arguments[1] === 'function'){
      cb = arguments[1];
      arguments[1] = null;
    }

    type = type || 'restaurant';
    radius = radius || 7000;

    var request = {
      location: pointOfInterest,
      radius: radius || 15000,
      types: [type]
    };

    var service = new google.maps.places.PlacesService(gMap);

    service.nearbySearch(request, function(results, status) {
      if(status === google.maps.places.PlacesServiceStatus.OK) {
        // result fields of interest
        // name
        // geometry.location
        // vicinity (address)
        // rating
        // icon
        // id

        //clear list of google map markers from map
        MarkerList.clearMap();
        // empty/initalize locations hash for new results
        locations = [];
        var place;
        for (var i = 0; i < results.length; i++) {
          place = results[i];
          // cache results
          locations.push(place);
          // add google map markers for each place
          MarkerList.addMarker({
            position: place.geometry.location,
            title: place.name,
            icon: place.icon,
            place_id: place.place_id,
            place: place
          });
        }
      } else {
        console.error('call to PlacesServices did not succeed');
      }
      if(typeof cb === 'function'){
        cb(locations);
      }
    });

  };

  return {
    init: init,
    gMap: gMap,
    getLocations: getLocations,
    setLocations: setLocations,
    setCenter: setCenter,
    findPlaces: findPlaces,
    getLatLng: getLatLng,

    // each object in MarkerList.markers has a place property that references the original place object returned from google.
    MakerList: MarkerList
  };

}]);