'use strict';

angular.module('nite-out.auth', ['ui.router'])

.controller('AuthController', ['$scope', '$state', 'AuthRequests', 'ngDialog', function($scope, $state, AuthRequests, ngDialog) {
  $scope.userInfo = {};

  $scope.loginStatus = AuthRequests.resolved;

  $scope.loginPage = function() {
    ngDialog.open({
      template: 'app/auth/loginPage.html'
    });
  };

  $scope.signupPage = function() {
    ngDialog.open({
      template: 'signupPage.html'
    });
  };

  $scope.postSignupData = function(data) {
    AuthRequests.signup(data)
      .then(function() {
        $scope.checkAuth();
      });
  };

  $scope.getLoginData = function(data) {
    AuthRequests.userLogin(data);
  };

  $scope.checkAuth = function() {
    console.log($scope.loginStatus);
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
