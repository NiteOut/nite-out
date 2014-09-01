angular.module('nite-out.map')

.factory('Mapper', function(){

  var getLatLng = function(addressString, cb){
    var geolocation = {};
    // gecoder takes { address: string } as optional request object property
    var request = { address: addressString };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, function (response, status){
      if(status == google.maps.GeocoderStatus.OK){
        geolocation.latitude = response[0].geometry.location.lat();
        geolocation.longitude = response[0].geometry.location.lng();
        if(typeof cb === 'function'){
          cb(geolocation);
        } else {
          console.error('getLatLng requires a callback( { latitude: number, longitude: number } )');
        }
      } else {
        console.error('getLatLng was NOT successful at geocoding address');
      }
    });
  };

  var setMapCenter = function(addressString, cb){
    getLatLng(addressString, function (geolocation){
      cb(geolocation);
    });
  };

  return {
    setCenter: setMapCenter
  }

});