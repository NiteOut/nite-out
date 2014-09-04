'use strict';

angular.module('nite-out.services', [])

.factory('Search', [function(){
  var current = '';
  var type = '';
  
  return {
    current: current,
    type: type
  };
}])

.factory('Main', [function(){
  var user = '';

  return {
    user: user,
  };
}]);