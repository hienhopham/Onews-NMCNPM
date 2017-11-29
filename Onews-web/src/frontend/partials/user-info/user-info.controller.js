(function () {
  'use strict';

  angular.module('Onews')
    .controller('userInfoController', ['$scope', '$rootScope', 'UserService', function ($scope, $rootScope, UserService) {

      var self = this;

      self.$onInit = onInit;

      function onInit() {
        if ($rootScope.globals.currentUser) {
          loadCurrentUser();
        }

        $scope.today = function() {
          if ($scope.today) {
            $scope.day = new Date();
          }
        };
        $scope.options = {
          minDate: new Date(),
          showWeeks: true
        };
      }

      function loadCurrentUser() {
        UserService.GetByUsername($rootScope.globals.currentUser.username)
          .then(function (user) {
            $scope.user = user;
            console.log(user);
          });
      }
    }]);
})();