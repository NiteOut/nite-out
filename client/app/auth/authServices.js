angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', function($http) {
  var signup = function(userData) {
    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    .success(function(res) {
      console.log(res);
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
      // add token
      console.log('worked');
      console.log(res);
    }).error(function(err) {
      console.error(err);
    });
  };

  return {
    signup: signup,
    userLogin: userLogin
  };
}]);
