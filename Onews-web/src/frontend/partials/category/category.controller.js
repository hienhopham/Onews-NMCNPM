(function () {
  'use strict';

  angular.module('Onews')
    .controller('categoryController', ['$scope', '$timeout', '$location', '$stateParams', 'CategoryService', function ($scope, $timeout, $location, $stateParams, CategoryService) {

      var self = this;

      $scope.articles = [];
      self.$onInit = $onInit;

      function $onInit() {

          CategoryService.GetById($stateParams.id)
            .then(function (response) {
              if (response.success) {
                $scope.category = response.category;
              } else {
                $location.path('/#/');
              }
            });

      }
    }]);
})();