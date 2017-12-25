(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('userCreateController', userCreateController);

  userCreateController.$inject = ['$scope', '$rootScope', 'AuthenticationService'];
  function userCreateController($scope, $rootScope, AuthenticationService) {
    var self = this;

    self.$onInit = onInit;

    $scope.createUser = createUser;

    function onInit() {
      if(!$rootScope.admin.username) {
        window.location.href = '/#/admin/manage';
      }
    }

    function createUser() {
      var user = angular.copy($scope.user);

      AuthenticationService.Register(user, function(response) {
        if (response.success) {
          window.location.reload('/#/admin/manage/users');
        } else {
          $scope.error = 'username existed';
        }
      });
    }

  }

})();
