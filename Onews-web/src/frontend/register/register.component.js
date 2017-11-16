(function() {
  'use strict';

  angular.module('Onews')
    .component('register', {
      controller: 'RegisterController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/register/register.template.html'
    });
})();
