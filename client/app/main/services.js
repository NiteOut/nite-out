'use strict';

angular.module('nite-out.mainServices', [])

// Search service handles passing data around to other modules in order
// to keep the data from needing to be bound in each controller seperately
.factory('Search', [function(){
  var current = '';
  var type = '';
  
  return {
    current: current,
    type: type
  };
}])

// Main service holds all the information about our current user, and the
// associated shopping cart.
.factory('Main', ['$state', function($state){
  var user = '';
  var cart = [];

  // Extracting our addToCart function requires that all modules present 
  // their data to the cart in a uniform way and allows new modules to be added
  // without the need to modify the existing cart or client-side code.
  var addToCart = function(name, time, numTickets) {
    cart.push({
      event: name,
      time: time,
      numTickets: numTickets
    });
    $state.go('main.shopping');
  };

  return {
    user: user,
    cart: cart,
    addToCart: addToCart
  };
}]);