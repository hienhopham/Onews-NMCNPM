(function() {
  'use strict';

  angular.module('Onews')
    .component('articles', {
      bindings: {
        category: '='
      },
      controller: 'articlesController',
      controllerAs: 'ctrl',
      templateUrl: 'admin/directives/articles.template.html'
    })

    .controller('articlesController', ['$timeout', 'ArticleService', function($timeout, ArticleService) {
      var self = this;

      self.articles = [];
      self.$onInit = $onInit;

      function $onInit() {

        $timeout(function() {
          ArticleService.GetByCategory(self.category.id)
          .then(function(response) {
            if(response.success) {
              self.article_list = response.article_list;
            }
          });
        }, 200);

      }

    }]);

})();
