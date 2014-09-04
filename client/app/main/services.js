'use strict';

angular.module('nite-out.search', [])

.factory('Search', [function(){
  var current = '';
  var type = '';
  
  return {
    current: current,
    type: type
  };
}]);