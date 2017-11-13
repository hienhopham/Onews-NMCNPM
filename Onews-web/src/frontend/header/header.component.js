(function() {
  'use strict';

  angular.module('Onews')
    .component('onewsHeader', {
      templateUrl: 'frontend/header/header.template.html',
      controllerAs: 'ctrl',
      controller: 'headerController'
    });
})();