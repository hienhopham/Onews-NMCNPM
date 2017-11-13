(function() {
  'use strict';

  angular.module('Onews')
    .component('tags', {
      controller: 'tagsController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/tags/tags.template.html'
    });
})();
