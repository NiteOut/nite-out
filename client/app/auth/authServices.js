angular.module('nite-out.authServices',[])

.factory('AuthRequests', ['$http', function($http) {
  var loginInfo = function(userData) {
    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    .then(function(res) {
      console.log(res.data);
    });
  };

  return {
    loginInfo: loginInfo
  };
}]);
