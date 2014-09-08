angular.module('nite-out.marketTest', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.markettest', {
      url: '/thankyou',
      templateUrl: 'app/checkout/marketTestPage.html',
      controller: 'MarketController'
    });
}])

.controller('MarketController',['$scope', function($scope) {
  
}])