(function() {
  'use strict';

  angular.module('Onews')
    .controller('listArticlesController', ['$timeout', 'LIST_ARTICLES_TYPES', 'ArticleService', function($timeout, LIST_ARTICLES_TYPES, ArticleService) {
      var self = this;

      self.articles = [];
      self.$onInit = $onInit;

      function $onInit() {
        
        self.listArticlesType = ((self.type === LIST_ARTICLES_TYPES.type1) ? 1 : 2);

        $timeout(function() {
          ArticleService.GetByCategory(self.category.id, 5)
          .then(function(response) {
            if(response.success) {
              self.articles = response.article_list;
            }
          });
        }, 200);

      }

    }]);
})();