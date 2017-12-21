(function () {
  'use strict';

  angular.module('Onews')
    .controller('hotTopicController', ['$scope', '$stateParams', 'HotTopicService', 'ArticleService', function ($scope, $stateParams, HotTopicService, ArticleService) {

      var self = this;

      $scope.articles = [];
      self.$onInit = $onInit;

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
              $scope.articles = response.article_list;
            } else {
              $scope.error = 'Không có bài báo nào trong chủ đề này.';
            }
          });

      }
    }]);
})();