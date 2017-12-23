(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('registerController', registerController);

  registerController.$inject = ['UserService', 'AuthenticationService'];
  function registerController(UserService, AuthenticationService) {
    var self = this;

    self.register = register;

    function register() {
      var user = angular.copy(self.user);

      self.dataLoading = true;

      AuthenticationService.Register(user, function(response, passwordBase64) {
        if (response.success) {
          self.error = false;
          self.dataLoading = false;
          response.user.password = passwordBase64;
          AuthenticationService.SetCredentials(response.user);
          window.location.reload();
        } else {
          self.dataLoading = false;
          self.error = 'Tên tài khoản đã tồn tại';
        }
      });
    }
  }

})();
