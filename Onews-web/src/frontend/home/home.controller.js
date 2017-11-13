(function () {
  'use strict';

  angular.module('Onews')
    .controller('homeController', ['$scope', function ($scope) {

      // $scope.message = 'test';

      $scope.categories = [
        {
          id: 1,
          name: 'Giải trí'
        },
        {
          id: 2,
          name: 'Xã hội'
        }
      ];
    }]);
})();