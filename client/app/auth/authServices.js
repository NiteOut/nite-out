angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', function($http) {
  var signup = function(userData) {
    // console.log(userData);
    return $http({
      method: 'POST',
      url: '/users',
      dataType: 'application/json',
      data: userData
    })
    .then(function(res) {
      console.log(res.data);
    });
  };

  return {
    signup: signup
  };
}]);
