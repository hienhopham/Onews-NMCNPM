(function() {
  'use strict';

  angular.module('Onews')
    .component('login', {
      controller: 'loginController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/login/login.template.html'
    });
})();
