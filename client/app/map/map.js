// map module
angular.module('nite-out.map', ['ui.router','google-maps'])

.config(function($stateProvider) {
  $stateProvider
    .state('main.map', {
      url: "/map",
      templateUrl: "app/map/map.html",
      controller: 'mapController'
    });
})

.controller('mapController', function($scope, Mapper, Movies){


  $scope.places;

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  // setting map options through the google-map directive interface
  $scope.setCenter = function(address){
    // async Geocoder API call
    Mapper.setCenter(address);
  }
  // takes args: ("type of establishment", optional radius in meters, optional callback())
  $scope.renderListOfPlaces = function(){
    $scope.$apply(function(){
      $scope.places = Mapper.getLocations();
    });
  };

  //$scope.renderListOfPlaces();
});
