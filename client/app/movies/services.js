'use strict';

angular.module('nite-out.movieFactory', [])

.factory('Movies', ['$http', function($http){
  var theaters = [];

  var getTheaters = function(zipcode) {
    theaters.splice(0);

    return $http({
      method: 'GET',
      url: '/api/movies',
      params: {zipcode: zipcode}
    })
    .then(function(resp) {
      resp.data.results.forEach(function(item) {
        theaters.push(item);
      });
    });
  };

  return {
    theaters: theaters,
    getTheaters: getTheaters
  };
}]);
