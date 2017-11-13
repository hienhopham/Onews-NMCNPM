(function () {
  'use strict';

  angular.module('Onews')
    .directive("tree", ['recursionService', function (recursionService) {
      return {
        restrict: "E",
        scope: { menu: '=' },
        transclude: false,
        templateUrl: 'frontend/tree/tree.template.html',
        compile: function (element) {
          return recursionService.compile(element, function (scope, iElement, iAttrs) {
          });
        }
      };
    }]);
})();