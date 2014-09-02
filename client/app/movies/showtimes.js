'use strict';

angular.module('nite-out.showtimes', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.showtimes', {
      url: '/showtimes',
      templateUrl: 'app/movies/showtimes.html',
      controller: 'showtimesController'
    });
}])

.controller('showtimesController', ['$scope', '$state', 'Movies', function($scope, $state, Movies){
  $scope.moviesStuff = Movies.theaters[0].movies; //hard coded for now
  // $scope.showtimes = [];
  // console.log(Movies.theaters[0].movies);
  // for(var i = 0; i < Movies.theaters[0].movies.length; i++){
  //   $scope.showtimes.push(Movies.theaters[0].movies.showtimes[i]);
  // }
  
  console.log(Movies.theaters);

console.log('HERE!');

}]);


