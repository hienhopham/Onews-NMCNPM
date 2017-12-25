(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('articleListController', articleListController);

  articleListController.$inject = ['$scope', '$rootScope', 'CategoryService'];
  function articleListController($scope, $rootScope, CategoryService) {
    var self = this;

    self.$onInit = onInit;

    $scope.activeTab = activeTab;
    $scope.now = 0;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }

      CategoryService.GetByLevel(1)
        .then(function (response) {
          if (response.success) {
            $scope.category_list = response.category_list;
          } else {
            $scope.error = 'No such category.';
          }

        });
    }

    function activeTab(index) {
      $scope.now = index;
    }

  }

})();
