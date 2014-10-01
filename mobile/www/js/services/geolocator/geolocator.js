'use strict';

angular.module('niteout.location-services', [])
.factory('GeoLocator', ['$q', function ($q) {
  // get current user location

  var getCurrentPosition = function () {
    var defer = $q.defer();

    var handleSuccess = function (position) {
      return defer.resolve(position);
    };

    var handleError = function (error) {
      return defer.resolve(error);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    return defer.promise;
  };

  var getZipCode = function (location) {
    var defer = $q.defer();
        
    new google.maps.Geocoder().geocode({'latLng': latLong(location.coords)}, function (res, status) {

      if (status === google.maps.GeocoderStatus.OK)
        defer.resolve(res[0].address_components[7].short_name);
      else
        defer.reject(status);
    });

    return defer.promise;
  };

  var listen = function () {

  };

  return {
    getCurrentPosition: getCurrentPosition,
    getZipCode: getZipCode
  };

}]);