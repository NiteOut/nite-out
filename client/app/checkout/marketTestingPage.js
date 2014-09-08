angular.module('nite-out.marketTest', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('markettest', {
      url: '/thankyou',
      templateUrl: 'app/checkout/marketTestingPage.html',
      controller: 'MarketController'
    });
}])

.controller('MarketController',['$scope', function($scope) {

}])