(function () {
  'use strict';

  angular.module('Onews')
    .controller('listArticlesController', ['$timeout', 'LIST_ARTICLES_TYPES', 'ArticleService', 'PagerService', function ($timeout, LIST_ARTICLES_TYPES, ArticleService, PagerService) {
      var self = this;

      self.articles = [];
      self.pager = {};

      self.$onInit = $onInit;
      self.setPage = setPage;

      function $onInit() {

        self.listArticlesType = ((self.type === LIST_ARTICLES_TYPES.type1) ? 1 : 2);

        $timeout(function () {
          ArticleService.GetByCategory(self.category.id, self.limit)
            .then(function (response) {
              if (response.success) {
                var articles = angular.copy(response.article_list);

                self.article_list = angular.copy(articles);

                if (self.pagination) {
                  self.setPage(1, articles);
                } else {
                  self.articles = angular.copy(articles);
                }
              }
            });
        }, 200);

      }

      function setPage(page, articles) {
        if (page < 1 || page > self.pager.totalPages) {
          return;
        }

        articles = articles || self.article_list;

        self.pager = PagerService.GetPager(articles.length, page);
        self.articles = articles.slice(self.pager.startIndex, self.pager.endIndex + 1);
      }

    }]);
})();