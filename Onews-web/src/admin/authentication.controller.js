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
      AuthenticationService.Login($scope.user.username, $scope.user.password, function (response) {
        if (response.success) {
          setCurrentUser(response.currentUser);
        } else {
          FlashService.Error(response.message);
        }
      });
    };

    function setCurrentUser(currentUser) {
      AuthenticationService.SetCredentials(currentUser);
      $location.path('/manage');
      // $window.location.reload();
    }
  }

})();
