(function () {
  'use strict';

  angular.module('Onews')
    .controller('headerController', ['$rootScope', '$window', 'UserService', 'AuthenticationService', function ($rootScope, $window, UserService, AuthenticationService) {
      var self = this;

      self.$onInit = onInit;
      self.logout = logout;

      function onInit() {
        if ($rootScope.globals.currentUser) {
          loadCurrentUser();
        }

        self.menu = {
          name: "Menu",
          children: [{
            name: "Child1",
            level: 0,
            children: []
          }, {
            name: "Child2",
            level: 0,
            children: [{
              name: "Grandchild1",
              level: 1,
              children: []
            }, {
              name: "Grandchild2",
              level: 1,
              children: []
            }, {
              name: "Grandchild3",
              level: 1,
              children: []
            }]
          }, {
            name: "Child3",
            level: 0,
            children: []
          }]
        };
      }

      function loadCurrentUser() {
        UserService.GetByUsername($rootScope.globals.currentUser.username)
          .then(function (res) {
            self.user = res.user[0];
          });
      }

      function logout() {
        AuthenticationService.ClearCredentials();
        $window.location.reload();
      }

    }]);

})();