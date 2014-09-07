'use strict';

angular.module('nite-out.authServices',[])

// Houses all the business logic for our token based application system
.factory('AuthRequests', ['$http', '$window', 'Main', function($http, $window, Main) {
  // Create a token in localStorage based on the authentication token
  // passed back by the server.
  var setToken = function(token) {
    $window.localStorage.setItem('nite-out.user', token);
  };

  // Wrapped in an array in order to allow manipulation without losing context.
  // Setting it based on the existance of an item in localStorage allows
  // the user to arrive at the site and already be logged in.
  var resolved = [$window.localStorage.getItem('nite-out.user') !== null];

  var signup = function(userData) {
    // Empty the array using native angular method to allow for overwriting
    angular.copy([], resolved);

    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    // On successful response from the server, we want to set our current user,
    // save the token to localStorage and update our auth controller.
    .success(function(res) {
      Main.user = res.user;
      setToken(res.token);
      resolved.push(true);
    });
  };

  var userLogin = function(userData) {
    // Empty the array using native angular method to allow for overwriting
    angular.copy([], resolved);

    return $http({
      method: 'GET',
      url: '/users',
      params: userData
    })
    // Upon user verification, we set our current user, save the token
    // and update our auth controller.
    .success(function(res) {
      Main.user = res.user;
      setToken(res.token);
      resolved.push(true);
    });
  };

  var signout = function() {
    // Empty the resolved array, delete the token from localStorage and update
    // auth controller with new resolved state.
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
