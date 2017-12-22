(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('authenticationController', authenticationController);

  authenticationController.$inject = ['$scope', '$window', '$location', '$rootScope', 'UserService', 'AuthenticationService', 'FlashService'];
  function authenticationController($scope, $window, $location, $rootScope, UserService, AuthenticationService, FlashService) {
    var self = this;

    self.$onInit = onInit;
    $scope.login = login;

    function onInit() {
      // reset login status
      //AuthenticationService.ClearCredentials();
    }

    function login() {
      if($scope.user.username === "admin" && $scope.user.password === 'admin') {
        $rootScope.admin = $scope.user;
        window.location.href = '/#/admin/manage';
      } else {
        $scope.error = 'Tài khoản không đúng.';
      }
    };
  }

})();
