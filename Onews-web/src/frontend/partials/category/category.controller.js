(function () {
  'use strict';

  angular.module('Onews')
    .controller('categoryController', ['$scope', '$stateParams', 'CategoryService', function ($scope, $stateParams, CategoryService) {

      var self = this;

      $scope.articles = [];
      self.$onInit = $onInit;

      function $onInit() {

          CategoryService.GetById($stateParams.id)
            .then(function (response) {
              if (response.success) {
                $scope.category = response.category;
              } else {
                window.location.href = '/#/';
              }
            });

      }
    }]);
})();