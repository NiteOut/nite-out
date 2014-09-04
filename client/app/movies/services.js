'use strict';

angular.module('nite-out.movieFactory', [])

.factory('Movies', ['$http', 'Mapper', '$q', function($http, Mapper, $q){
  var theaters = [];
  var movies = [];
  var shows = [];

  var getTheaters = function(zipcode) {
    angular.copy([], theaters);

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
          movies: item.movies,
          icon: '/assets/cinema.png',
        };
        theaters.push(theater);
      });

      var promises = [];
      theaters.forEach(function(theater, index) {
        if (index >= 10) {
          return;
        }
        promises.push(Mapper.getLatLng(theater.address)
          .then(function(data) {
            theaters[index].coords = data;
            return theaters[index];
          }));
      });

      return $q.all(promises);
    });

  };

  return {
    theaters: theaters,
    movies: movies,
    shows: shows,
    getTheaters: getTheaters
  };
}]);
