angular.module('nite-out.movies', [])

.factory('Movies', function($http){
  var theaters = [];

  var getTheaters = function(zipcode) {
    return $http({
      method: 'GET',
      url: '/api/movies',
      params: {zipcode: zipcode}
    })
    .then(function(resp) {
      theaters = resp.data.results;
    });

    return{
    theaters: theaters,
    getTheaters: getTheaters
  };
});