'use strict';

angular.module('nite-out.movies', ['ui.router'])      //register the movies module with the app.

.config(['$stateProvider', function($stateProvider) { //set up the state 
  $stateProvider
    .state('main.movies', {                           //set state name
      url: '/movies',                                 //set url extension name
      templateUrl: 'app/movies/movies.html',          //set the actual template url
      controller: 'MoviesController',                 //register the controller for the module
      resolve: {                                      //gather list of movies from search query
        theaters: function(Movies, Search) {
          return Movies.getTheaters(Search.current)
          .then(function(list) {
            return list;
          });
        }
      },
      data: {
        loading: function() {                                          //loading animation
          var el = angular.element(document.getElementById('main'));
          el.html(
            '<div class="spinner"><div class="rect1"></div>' +
            '<div class="rect2"></div><div class="rect3"></div>' +
            '<div class="rect4"></div><div class="rect5"></div></div>'
            );
        }
      }
    });
}])

//movies controller for passing values and functions by reference to the scope of the page. 
.controller('MoviesController', ['$scope', '$state', 'theaters', 'Movies', 'Mapper', function($scope, $state, theaters, Movies, Mapper){
  $scope.map = Mapper.init;                   //add a map that reflects the current lookup
  $scope.theaters = theaters;                 //add list of theaters for lookup

  $scope.toShowtimes = function(selected) {   //add function to move to next page with a selected value
    Movies.selected = selected;
    $state.go('main.showtimes');
  };

}]);
  
