(function() {
  'use strict';

  angular.module('Onews')
    .component('listArticles', {
      bindings: {
        category: '=',
        type: '@', // there are two types of list
        limit: '=',
        pagination: '='
      },
      controller: 'listArticlesController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/list-articles/list-articles.template.html'
    });
})();
