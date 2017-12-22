(function () {
  'use strict';

  angular.module('Onews')
    .controller('userInfoController', ['$scope', '$rootScope', '$window', 'UserService', 'AuthenticationService', 'Base64Service', function ($scope, $rootScope, $window, UserService, AuthenticationService, Base64Service) {

      var self = this;

      self.$onInit = onInit;
      $scope.updateInfo = updateInfo;

      function onInit() {
        if ($rootScope.globals.currentUser) {
          $scope.user = angular.copy($rootScope.globals.currentUser);

          if ($scope.user.date_of_birth ) {
            $scope.user.date_of_birth = new Date($scope.user.date_of_birth);
          }
          if ($scope.user.password) {
            $scope.user.password = Base64Service.decode($scope.user.password);
          }
        }
      }

      function updateInfo() {
        var user = angular.copy($scope.user);

        UserService.Update(user)
          .then(function(response) {
            if (response.success) {
              AuthenticationService.SetCredentials(user);
              $swindow.location.reload();
            }
          })
      }
    }]);
})();