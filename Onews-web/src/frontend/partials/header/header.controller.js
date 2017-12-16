(function () {
  'use strict';

  angular.module('Onews')
    .controller('headerController', ['$rootScope', '$window', 'UserService', 'AuthenticationService', function ($rootScope, $window, UserService, AuthenticationService) {
      var self = this;

      self.$onInit = onInit;
      self.logout = logout;

      function onInit() {
        if ($rootScope.globals.currentUser) {
          self.user = angular.copy($rootScope.globals.currentUser);
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

      function logout() {
        AuthenticationService.ClearCredentials();
        $window.location.reload();
      }

    }]);

})();