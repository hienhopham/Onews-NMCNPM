(function() {
  'use strict';

  angular.module('Onews')
    .controller('relatedArticlesController',['$timeout', 'ArticleService', function($timeout, ArticleService) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {

        $timeout(function() {
          ArticleService.GetByCategory(self.category, 4)
          .then(function(response) {
            if(response.success) {
              self.relatedArticles = response.article_list;
            }
          });
        },100);

      }

    }]);
})();