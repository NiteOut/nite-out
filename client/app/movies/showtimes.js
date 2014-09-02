angular.module('nite-out.showtimes', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
    .state('main.showtimes', {
      url: '/showtimes',
      templateUrl: 'app/movies/showtimes.html',
      controller: 'showtimesController'
    });
})

.controller('showtimesController', function($scope){

});

console.log('HERE!');

