angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', '$window', function($http, $window) {
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
    }).error(function(err) {
      console.error(err);
    });
  };

  return {
    signup: signup,
    userLogin: userLogin
  };
}]);
