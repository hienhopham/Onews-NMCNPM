(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('categoryListController', categoryListController);

  categoryListController.$inject = ['$scope', '$rootScope', 'CategoryService'];
  function categoryListController($scope, $rootScope, CategoryService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      if(!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }

      CategoryService.GetAll()
        .then(function(response) {
          if(response.success) {
            $scope.category_list = response.category_list;
          } else {
            $scope.error = 'No such category.';
          }
          
        });
    }

  }

})();
