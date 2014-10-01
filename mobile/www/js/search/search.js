angular.module('niteout.search', [])
.directive('search', [function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    // replace: true,
    templateUrl: 'js/search/search.html',
    link: function (scope, element, attrs) {
      
    }
  };
}])