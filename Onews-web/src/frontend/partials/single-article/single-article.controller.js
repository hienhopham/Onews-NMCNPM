(function () {
  'use strict';

  angular.module('Onews')
    .controller('singleArticleController', ['$scope', '$stateParams', 'ArticleService', 'CategoryService', function ($scope, $stateParams, ArticleService, CategoryService) {

      var self = this;
      var content = [];
      self.$onInit = onInit;

      function onInit() {

        ArticleService.GetById($stateParams.id)
          .then(function (response) {
            if (response.success) {
              $scope.article = response.article;

              CategoryService.GetById(response.article.category_id)
                .then(function (response) {
                  if (response.success) {
                    $scope.category = response.category;
                  }
                });
            } else {
              window.location.href = '/#/';
            }
          });

        CategoryService.GetByLevel(1)
          .then(function (response) {
            if (response.success) {
              $scope.categories = angular.copy(response.category_list);
            }
          });

      }
    }]);
})();