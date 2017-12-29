(function() {
  'use strict';

  angular.module('Onews')
    .component('articleInfo', {
      bindings: {
        article: '='
      },
      controller: 'articleInfoController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/article-info/article-info.template.html'
    });
})();
