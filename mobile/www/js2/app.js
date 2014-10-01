// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
'use strict';

angular.module('niteout', [
  // 'ngMap',
  'ionic', 
  // 'niteout.movies',
  // 'niteout.maps'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config( function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    // .state('login', {
    //   url: '/login',
    //   templateUrl: 'views/login.html',
    //   // controller: 'AuthController'
    // })
    // .state('signup', {
    //   url: '/signup',
    //   templateUrl: 'views/signup.html',
    //   // controller: 'AuthController'
    // })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('/login');
    // $httpProvider.interceptors.push('AttatchTokens');
})
.controller('MainCtrl', ['$scope',  function ($scope) {


  // Maps
  //  .initialize()
  //  .then(Movies.query)
  //  .then(Events.query)
  //  .then(Food.query)
  

  $scope.map = {
    center: 'San Francisco, California'
  };

  $scope.$on('mapsInitialized', function(e, maps) {
    map = maps[0];
  });

  // GeoLocator
  //   .getCurrentPosition()
  //   .then(GeoLocator.getZipCode)



}]);


// angular.module('niteout.maps', ['niteout.location-services'])
// .factory('Maps', ['GeoLocator', 'GoogleMaps', function (GeoLocator, GoogleMaps) {
//   'use strict';


//   var initialize = function () {
//     return GeoLocator
//             .getCurrentPosition()
//             .then(function (location) { 
//               var map = {};

//               map.zoom = 13;
//               map.center = [
//                 location.coords.latitude,
//                 location.coords.longitude
//               ];
              

//               return map;

//               // // move Marker to updated location
//               // $scope.userMarker = new google.maps.Marker();
//               // $scope.userMaker.setPosition(loc);
//               // $scope.userMaker.setMap(map);
//             });
//   };
//   return {
//     initialize: initialize
//   };
// }]);

// angular.module('niteout.movies', ['ngResource'])
// .factory('Movies', ['$resource', function ($resource) {
//   return $resource('http://localhost:8070/api/movies', {}, {
//     query: { method: 'GET' }
//   });

// }]);