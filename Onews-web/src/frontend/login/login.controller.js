(function() {
  'use strict';

  angular.module('Onews')
    .controller('loginController', ['$rootScope', 'AUTH_EVENTS', function($rootScope, AUTH_EVENTS) {
      var self = this;

      self.credentials = {
        username: '',
        password: ''
      };
      self.unauthenticated = true;

      self.$onInit = onInit;
      self.submit = submit;

      function onInit() {
        console.log(self.credentials);
      }

      function submit() {
        if(self.credentials.username == 'hien' && self.credentials.password =='hien') {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, self.credentials);
          self.unauthenticated = false;
          console.log(AUTH_EVENTS.loginSuccess);
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          self.unauthenticated = true;
          console.log(AUTH_EVENTS.loginFailed);
        }
      }

    }]);

})();