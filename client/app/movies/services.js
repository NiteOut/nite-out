'use strict';

angular.module('nite-out.movieFactory', [])

.factory('Movies', ['$http', 'Mapper', function($http, Mapper){
  var theaters = [];
  var movies = [];
  var shows = [];
  var fetched = false;

  var getTheaters = function(zipcode) {
    theaters.splice(0);

    return $http({
      method: 'GET',
      url: '/api/movies',
      params: {zipcode: zipcode}
    })
    .then(function(res) {
      res.data.results.forEach(function(item, index) {
        var theater = {
          id: index + 1,
          name: item.name,
          phone: item.phoneNumber,
          address: item.address,
          movies: item.movies
        };
        theaters.push(theater);
      });
      theaters.forEach(function(theater, index) {
        Mapper.getLatLng(theater.address)
          .then(function(data) {
            theaters[index].coords = data;
          });
      });
    });

  };

  return {
    fetched: fetched,
    theaters: theaters,
    movies: movies,
    shows: shows,
    getTheaters: getTheaters
  };
}]);

// angular.module('nite-out.mo', [])
