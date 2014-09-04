'use strict';

angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', '$window', '$state', function($http, $window, $state) {
  var setToken = function(token) {
    $window.localStorage.setItem('nite-out.user', token);
  };

  var resolved = [$window.localStorage.getItem('nite-out.user') !== null];

  var signup = function(userData) {
    resolved.splice(0);

    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    .success(function(res) {
      console.log(res.user);
      setToken(res.token);
      resolved.push(true);
    });
  };

  var userLogin = function(userData) {
    resolved.splice(0);

    return $http({
      method: 'GET',
      url: '/users',
      params: userData
    })
    .success(function(res) {
      console.log(res.user);
      setToken(res.token);
      resolved.push(true);
    });
  };

  var signout = function() {
    $window.localStorage.removeItem('nite-out.user');
  };

  return {
    resolved: resolved,
    signout: signout,
    signup: signup,
    userLogin: userLogin
  };
}]);
