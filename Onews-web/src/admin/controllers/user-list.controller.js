(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('userListController', userListController);

  userListController.$inject = ['$scope', '$rootScope', 'UserService'];
  function userListController($scope, $rootScope, UserService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      UserService.GetAll()
        .then(function(response) {
          if(response.success) {
            $scope.user_list = response.user_list;
          } else {
            $scope.error = 'Không có người dùng';
          }
          
        });
    }

  }

})();
