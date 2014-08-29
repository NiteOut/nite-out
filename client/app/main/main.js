// inject the 'ui-router' dependency anytime you create a router for a module
angular.module('nite-out.main', ['ui.router'])

// example of modular routing
.config(function($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
})

.controller('MainController', function($scope, $state) {
  $scope.input = '';
  // on ng-submit, this function currently manually injects main.movies subview into the main.html
  $scope.renderPage = function() {
    $state.go('main.movies');
  };
});
