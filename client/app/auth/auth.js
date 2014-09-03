angular.module('nite-out.auth', ['ui.router'])

.controller('AuthController', ['$scope', '$state', 'AuthRequests', function($scope, $state, AuthRequests) {
  $scope.userInfo = {};
  $scope.loginPage = function() {
    $state.go('login');
  };
  $scope.signupPage = function() {
    $state.go('signup');
  };

  $scope.sendData = function(data) {
    AuthRequests.loginInfo(data);
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

