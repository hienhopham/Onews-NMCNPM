(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('registerController', registerController);

  registerController.$inject = ['UserService', '$window', '$rootScope', 'FlashService'];
  function registerController(UserService, $window, $rootScope, FlashService) {
    var self = this;

    self.register = register;

    function register() {
      self.dataLoading = true;
      UserService.Create(self.user)
        .then(function (response) {
          if (response.success) {
            FlashService.Success('Registration successful', true);
            $window.location.reload();
          } else {
            FlashService.Error(response.message);
            self.dataLoading = false;
          }
        });
    }
  }

})();
