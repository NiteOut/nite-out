angular.module('nite-out.movies', [])

.factory('Movies', function($http, $location){
  var theaters = [];

  var getTheaters = function() {
    return $http({
      method: 'GET',
      url: '/api/movies'
    })
    .then(function(resp) {
      theaters = resp.data.results;
    });

    return{
    theaters: theaters,
    getTheaters: getTheaters
  };
});