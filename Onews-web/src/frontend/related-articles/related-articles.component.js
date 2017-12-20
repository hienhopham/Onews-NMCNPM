(function() {
  'use strict';

  angular.module('Onews')
    .component('relatedArticles', {
      bindings: {
        category: '@'
      },
      controller: 'relatedArticlesController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/related-articles/related-articles.template.html'
    });
})();
