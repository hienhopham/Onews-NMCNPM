(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('authenticationController', authenticationController);

  authenticationController.$inject = ['$scope', '$cookies', '$rootScope', 'UserService'];
  function authenticationController($scope, $cookies, $rootScope, UserService) {
    var self = this;

    self.$onInit = onInit;
    $scope.login = login;
    $scope.logout = logout;

    function onInit() {
      if(!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      } else {
        window.location.href = '/#/admin/manage';
      }
    }

    function login() {
      var user = angular.copy($scope.user);

      user.username = 'admin';
      if (user.username === "admin" && user.password === 'admin') {
        SetCredentials(user);
        window.location.href = '/#/admin/manage';
      } else {
        $scope.error = 'Tài khoản không đúng.';
      }
    };

    function logout() {
      ClearCredentials();
      window.location.href = '/#/admin';
    };

    function SetCredentials(admin) {

      $rootScope.admin = admin;

      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.putObject('admin', $rootScope.admin, { expires: cookieExp });
    }

    function ClearCredentials() {
      $rootScope.admin = {};
      $cookies.remove('admin');
    }
  }

})();
