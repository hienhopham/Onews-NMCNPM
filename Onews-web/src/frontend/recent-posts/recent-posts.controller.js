(function() {
  'use strict';

  angular.module('Onews')
    .controller('recentPostsController',['ArticleService', function(ArticleService) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {
        
        ArticleService.GetListTimeOrder(5)
          .then(function(response) {
            self.articles = response.article_list;
          });

      }

    }]);
})();