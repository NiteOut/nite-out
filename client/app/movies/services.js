'use strict';

angular.module('nite-out.movieFactory', [])

.factory('Movies', ['$http', function($http){
  var theaters = [];
  var movies = [];
  var shows = [];

  var getTheaters = function(zipcode) {
    theaters.splice(0);

    return $http({
      method: 'GET',
      url: '/api/movies',
      params: {zipcode: zipcode}
    })
    .then(function(resp) {
      console.log(resp);
      resp.data.results.forEach(function(item) {
        theaters.push(item);
      });

      for(var i = 0; i < theaters.length; i++){      
        movies.push(theaters[i].movies);
      }


    });
  };

  return {
    theaters: theaters,
    movies: movies,
    shows: shows,
    getTheaters: getTheaters
  };
}]);

// angular.module('nite-out.mo', [])
