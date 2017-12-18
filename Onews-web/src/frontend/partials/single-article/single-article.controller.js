(function () {
  'use strict';

  angular.module('Onews')
    .controller('singleArticleController', ['$scope', '$stateParams', 'ArticleService', 'CategoryService', function ($scope, $stateParams, ArticleService, CategoryService) {

      var self = this;
      var content = [];
      self.$onInit = onInit;

      function onInit() {

          ArticleService.GetById($stateParams.id)
          .then(function(response) {
            $scope.article = response.article;
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