// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
'use strict';

angular.module('niteout', [
  'ngMap',
  'ionic', 
  'niteout.maps',
  'niteout.cart',
  'niteout.services',
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
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      // controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      // controller: 'AuthController'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('/login');
    // $httpProvider.interceptors.push('AttatchTokens');
})
.controller('MainCtrl', ['$scope', '$ionicModal', 'Movies', 'Food', function ($scope, $ionicModal, Movies, Food) {
  $scope.searchResults = [];

  Movies
    .query({zip: 94109}).$promise // test zip
    .then(function(data){
      $scope.searchResults = $scope.searchResults.concat(data.results);
    });

  $scope.map = {
    center: 'San Francisco, California'
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('../views/search-settings.html', function(modal) {
    $scope.settingsModal = modal;
  }, {
    scope: $scope
  });

  $scope.showModal = window.showm = function () {
    $scope.settingsModal.show();
  };


}]);