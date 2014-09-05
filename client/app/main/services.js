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

.factory('Main', ['$state', function($state){
  var user = '';
  var cart = [];

  var addToCart = function(name, time, numTickets) {
    cart.push({
      event: name,
      time: time,
      numTickets: numTickets
    });
    $state.go('main');
  };

  return {
    user: user,
    cart: cart,
    addToCart: addToCart
  };
}]);