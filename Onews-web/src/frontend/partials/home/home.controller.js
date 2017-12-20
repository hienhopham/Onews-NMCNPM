(function () {
  'use strict';

  angular.module('Onews')
    .controller('homeController', ['$scope', '$rootScope', 'CategoryService', function ($scope, $rootScope, CategoryService) {

      // $scope.message = 'test';
      var self = this;

      self.$onInit = onInit;

      function onInit() {
        var subCategories = [];
        $scope.subCategories = [];

        CategoryService.GetByLevel(1)
          .then(function (response) {
            if (response.success) {
              $scope.categories = angular.copy(response.category_list);
            }
          });
      }
    }]);
})();