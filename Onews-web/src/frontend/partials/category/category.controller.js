(function () {
  'use strict';

  angular.module('Onews')
    .controller('categoryController', ['$scope', '$stateParams', function ($scope, $stateParams) {

      // $scope.message = 'test';

      $scope.category =
        {
          id: $stateParams.id,
          name: 'Giải trí'
        };
    }]);
})();