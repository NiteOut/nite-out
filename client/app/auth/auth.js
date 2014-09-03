angular.module('nite-out.auth', ['ui.router'])

.controller('AuthController', ['$scope', '$state', function($scope, $state) {
  $scope.loginPage = function() {
    $state.go('login');
  };

  $scope.signupPage = function() {
    console.log('signup page')
  };

}])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('login' , {
      url: '/login',
      templateUrl: 'app/auth/loginPage.html',
      controller: 'AuthController'
    })
}])
