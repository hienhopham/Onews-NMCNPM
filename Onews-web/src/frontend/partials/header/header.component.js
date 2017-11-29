(function() {
  'use strict';

  angular.module('Onews')
    .component('onewsHeader', {
      controller: 'headerController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/partials/header/header.template.html'
    });
})();
