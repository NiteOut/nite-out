angular.module('nite-out.auth', ['ui.router'])

.controller('AuthController', ['$scope', function($scope) {
  $scope.loginPage = function() {
    console.log('login page')
  };

  $scope.signupPage = function() {
    console.log('signup page')
  };

}])
