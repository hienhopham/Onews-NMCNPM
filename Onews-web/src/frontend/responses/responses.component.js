(function() {
  'use strict';

  angular.module('Onews')
    .component('responses', {
      bindings: {
        article: '@'
      },
      controller: 'responsesController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/responses/responses.template.html'
    });
})();
