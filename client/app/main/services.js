'use strict';

angular.module('nite-out.search', [])

.factory('Search', [function(){
  var current = '';
  return {
    current: current
  };
}]);