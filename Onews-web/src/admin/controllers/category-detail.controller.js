(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('categoryDetailController', categoryDetailController);

  categoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'CategoryService'];
  function categoryDetailController($scope, $rootScope, $stateParams, CategoryService) {
    var self = this;

    self.$onInit = onInit;

    $scope.category = {};
    $scope.deleteCategory = deleteCategory;
    $scope.saveCategory = saveCategory;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      } else {

        $scope.levels = [1, 2];

        CategoryService.GetById($stateParams.id)
          .then(function (response) {
            if (response.success) {
              var category = angular.copy(response.category);

              $scope.category = category;

            } else {
              window.location.href = '/#/admin/manage/categories';
            }
          });
      }
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

    function saveCategory() {
      var category = angular.copy($scope.category);
      if(category.level == 1) {
        category.parent_id = null;
        $scope.category.parent_id = null;
      }

      CategoryService.Update(category)
        .then(function(response) {

          if(response.success) {
            $scope.category = response.category;
            window.location.reload();
          } else {
            $scope.error = 'Can not update';
          }

        });
      window.location.reload();
    }

    function deleteCategory() {
      CategoryService.Delete($stateParams.id)
        .then(function(response) {
          if(response.success) {
            window.location.reload('/#/admin/manage/users');
          } else {
            $scope.error = 'Can not delete';
          }

        });
    }

  }

})();
