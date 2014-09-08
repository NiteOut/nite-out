'use strict';

angular.module('nite-out.movies', ['ui.router'])      // register the movies module with the app.

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.movies', {                           
      url: '/movies',                                 
      templateUrl: 'app/movies/movies.html',          
      controller: 'MoviesController',                 
      resolve: {
        // Resolve allows us to resolve our movies fetch before the
        // user sees the screen.  Fetching theeaters returns an array of
        // promises which we can then manipulate and pass to our controller
        // upon being resolved;       
        theaters: function(Movies, Search) {
          return Movies.getTheaters(Search.current)
          .then(function(list) {
            return list;
          });
        }
      },
      data: {
        // Loading method handles the loading animation presented to the user
        // while waiting for the view to resolve
        loading: function() {
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

// Movies controller for passing values and functions by reference to the scope of the page.
.controller('MoviesController', ['$scope', '$state', 'theaters', 'Movies', 'Mapper', function($scope, $state, theaters, Movies, Mapper){
  $scope.showMe = false;
  // Add a map that reflects the current lookup
  $scope.map = Mapper.init;
  // Add list of theaters for lookup
  // Object decorator preps events to initialize google-map markers directive
  $scope.theaters = Mapper.makeMarkerFriendlyVersionsOf(theaters);

  $scope.toShowtimes = function(selected) {
    // Method to move to next page with a selected value
    Movies.selected = selected;
    $state.go('main.showtimes');
  };

}]);

