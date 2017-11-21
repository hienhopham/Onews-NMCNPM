(function() {
  'use strict';

  angular.module('Onews')
    .component('response', {
      bindings: {
        response: '<'
      },
      controller: 'responseController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/responses/response/response.template.html'
    });
})();
