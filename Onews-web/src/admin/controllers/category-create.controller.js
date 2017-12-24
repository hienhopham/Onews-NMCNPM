(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('categoryCreateController', categoryCreateController);

  categoryCreateController.$inject = ['$scope', '$rootScope', 'CategoryService'];
  function categoryCreateController($scope, $rootScope, CategoryService) {
    var self = this;

    self.$onInit = onInit;

    $scope.createCategory = createCategory;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }

      $scope.levels = [1, 2];

      CategoryService.GetByLevel(1)
      .then(function (response) {
        if (response.success) {
          var parents = angular.copy(response.category_list);

          $scope.parents = parents;

        } else {
          $scope.parents = [];
        }
      });
    }

    function createCategory() {
      var category = angular.copy($scope.category);
      if(category.level == 1) {
        category.parent_id = null;
        $scope.category.parent_id = null;
      }

      CategoryService.Create(category)
        .then(function(response) {
          if(response.success) {
            window.location.reload('/#/admin/manage/categories');
          } else {
            $scope.error = 'Can not create category';
          }
        });

    }

  }

})();
