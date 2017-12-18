(function() {
  'use strict';

  angular.module('Onews')
    .component('someArticles', {
      bindings: {
        categories: '<'
      },
      controller: 'someArticlesController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/some-articles/some-articles.template.html'
    });
})();
