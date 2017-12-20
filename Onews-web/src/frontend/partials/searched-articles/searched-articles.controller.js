(function () {
  'use strict';

  angular.module('Onews')
    .controller('searchedArticlesController', ['$scope', '$stateParams', 'ArticleService', function ($scope, $stateParams, ArticleService) {

      var self = this;

      self.$onInit = onInit;

      function onInit() {

        ArticleService.GetListBySearchKey($stateParams.searchKey)
          .then(function (response) {
            if(response.success) {
              var searchedArticles = angular.copy(response.found_articles);

              angular.forEach(searchedArticles, function(article) {
                article.searchKey = $stateParams.searchKey;
              });

              $scope.articles = searchedArticles;
            } else {
              $scope.error = 'Không có kết quả phù hợp với từ khóa.';
            }
            
          });
      }
    }]);
})();