'use strict';

angular.module('nite-out.auth', ['ui.router'])

.controller('AuthController', ['$scope', '$state', 'AuthRequests', function($scope, $state, AuthRequests) {
  $scope.loginShown = false;
  $scope.signupShown = false;

  $scope.toggleLogin = function() {
    $scope.loginShown = !$scope.loginShown;
  };
  
  $scope.toggleSignup = function() {
    $scope.signupShown = !$scope.signupShown;
  };

  $scope.userInfo = {};
  $scope.loginStatus = AuthRequests.resolved;

  $scope.postSignupData = function(data) {
    AuthRequests.signup(data);
  };

  $scope.getLoginData = function(data) {
    AuthRequests.userLogin(data);
  };

  $scope.signout = function() {
    AuthRequests.signout();
  };
}])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('login' , {
      url: '/login',
      templateUrl: 'app/auth/loginPage.html',
      controller: 'AuthController'
    })
    .state('signup' , {
      url: '/signup',
      templateUrl: 'app/auth/signupPage.html',
      controller: 'AuthController'
    });
}]);
