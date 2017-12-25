(function () {
  'use strict';

  angular.module('Onews')
    .controller('searchedArticlesController', ['$scope', '$stateParams', 'ArticleService', 'PagerService', function ($scope, $stateParams, ArticleService, PagerService) {

      var self = this;

      self.$onInit = onInit;

      $scope.setPage = setPage;
      $scope.pager = {};

      function onInit() {

        ArticleService.GetListBySearchKey($stateParams.searchKey)
          .then(function (response) {
            if(response.success) {
              var searchedArticles = angular.copy(response.found_articles);

              angular.forEach(searchedArticles, function(article) {
                article.searchKey = $stateParams.searchKey;
              });

              $scope.article_list = searchedArticles;
              $scope.setPage(1, searchedArticles);
            } else {
              $scope.error = 'Không có kết quả phù hợp với từ khóa.';
            }
            
          });
      }


      function setPage(page, articles) {
        if (page < 1 || page > $scope.pager.totalPages) {
          return;
        }

        articles = articles || $scope.article_list;

        $scope.pager = PagerService.GetPager(articles.length, page);
        $scope.articles = articles.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
      }
    }]);
})();