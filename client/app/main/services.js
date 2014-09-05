'use strict';

angular.module('nite-out.mainServices', [])

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
  var cart = [];

  return {
    user: user,
    cart: cart
  };
}]);