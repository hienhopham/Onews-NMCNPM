(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('registerController', registerController);

  registerController.$inject = ['$window', 'UserService', 'AuthenticationService'];
  function registerController($window, UserService, AuthenticationService) {
    var self = this;

    self.register = register;

    function register() {
      var user = angular.copy(self.user);

      self.dataLoading = true;

      AuthenticationService.Register(user, function(response) {
        if (response.success) {
          self.error = false;
          self.dataLoading = false;
          AuthenticationService.SetCredentials(user);
          $window.location.reload();
        } else {
          self.dataLoading = false;
          self.error = 'Tên tài khoản đã tồn tại';
        }
      });
    }
  }

})();
