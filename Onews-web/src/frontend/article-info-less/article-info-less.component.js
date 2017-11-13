(function() {
  'use strict';

  angular.module('Onews')
    .component('articleInfoLess', {
      bindings: {
        article: '='
      },
      controllerAs: 'ctrl',
      templateUrl: 'frontend/article-info-less/article-info-less.template.html'
    });
})();
