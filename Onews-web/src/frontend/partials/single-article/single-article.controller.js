(function () {
  'use strict';

  angular.module('Onews')
    .controller('singleArticleController', ['$scope', '$stateParams', function ($scope, $stateParams) {

      // $scope.message = 'test';

      $scope.article = {
        id: $stateParams.id
      };
      $scope.category = {
        id: 13
      };
    }]);
})();