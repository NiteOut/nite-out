'use strict';

angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', '$window', 'Main', function($http, $window, Main) {
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
      Main.user = res.user;
      setToken(res.token);
      resolved.push(true);
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
      Main.user = res.user;
      setToken(res.token);
      resolved.push(true);
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
