(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('userDetailController', userDetailController);

  userDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'UserService'];
  function userDetailController($scope, $rootScope, $stateParams, UserService) {
    var self = this;

    self.$onInit = onInit;

    $scope.deleteUser = deleteUser;
    $scope.saveUser = saveUser;

    function onInit() {
      UserService.GetById($stateParams.id)
        .then(function(response) {
          if(response.success) {
            var user = angular.copy(response.user);

            if (user.date_of_birth ) {
              user.date_of_birth = new Date(user.date_of_birth);
            }

            $scope.user = user;

          } else {
            window.location.href = '/#/admin/manage/users';
          }
        });
    }

    function saveUser() {
      UserService.Update($scope.user)
        .then(function(response) {
          $scope.user = response.user;
          window.location.reload();
        });
    }

    function deleteUser() {

    }

  }

})();
