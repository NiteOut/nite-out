'use strict';

angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', '$window', '$state', function($http, $window, $state) {
  var setToken = function(token) {
    $window.localStorage.setItem('nite-out.user', token);
  };

  var resolved = [$window.localStorage.getItem('nite-out.user') !== null];

  var signup = function(userData) {
    angular.copy([], resolved);

    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    .success(function(res) {
      setToken(res.token);
      resolved.push(true);
      $state.go('main');
    });
  };

  var userLogin = function(userData) {
    angular.copy([], resolved);

    return $http({
      method: 'GET',
      url: '/users',
      params: userData
    })
    .success(function(res) {
      setToken(res.token);
      resolved.push(true);
      $state.go('main');
    });
  };

  var signout = function() {
    angular.copy([], resolved);
    $window.localStorage.removeItem('nite-out.user');
    resolved.push(false);
  };

  return {
    resolved: resolved,
    signout: signout,
    signup: signup,
    userLogin: userLogin
  };
}]);
