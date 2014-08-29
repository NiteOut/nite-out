angular.module('nite-out.test', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
    .state('main.test', {
      url: '/test',
      templateUrl: 'app/movies/movies.html',
      controller: 'TestController'
    });
})

.controller('TestController', function($scope){
  console.log("works");
});

