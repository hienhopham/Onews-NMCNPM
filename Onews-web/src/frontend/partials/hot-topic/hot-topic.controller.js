(function () {
  'use strict';

  angular.module('Onews')
    .controller('hotTopicController', ['$scope', '$stateParams', 'HotTopicService', 'ArticleService', 'PagerService', function ($scope, $stateParams, HotTopicService, ArticleService, PagerService) {

      var self = this;

      self.$onInit = $onInit;

      $scope.articles = [];
      $scope.pager = {};
      $scope.setPage = setPage;      

      function $onInit() {

        HotTopicService.GetById($stateParams.id)
          .then(function (response) {
            if(response.success) {
              $scope.hotTopic = response.hot_topic;
            } else {
              $scope.hotTopic = {
                name: 'Noel 2017'
              };
            }
          });

        ArticleService.GetByHotTopic($stateParams.id)
          .then(function (response) {
            if(response.success) {
              var articles = angular.copy(response.article_list);

              $scope.article_list = angular.copy(articles);
              $scope.setPage(1, articles);
            } else {
              $scope.error = 'Không có bài báo nào trong chủ đề này.';
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