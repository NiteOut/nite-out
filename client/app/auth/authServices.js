angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', '$window', '$state', function($http, $window, $state) {
  var setToken = function(token) {
    $window.localStorage.setItem('nite-out.user', token);
  };

  var signup = function(userData) {
    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    .success(function(res) {
      setToken(res.token);
      $state.go('main');
    }).error(function(err) {
      console.error(err);
    });
  };

  var userLogin = function(userData) {
    return $http({
      method: 'GET',
      url: '/users',
      params: userData
    })
    .success(function(res) {
      setToken(res.token);
      $state.go('main');
    }).error(function(err) {
      console.error(err);
    });
  };

  var signout = function() {
    $window.localStorage.removeItem('nite-out.user');
  };

  return {
    signout: signout,
    signup: signup,
    userLogin: userLogin
  };
}]);
