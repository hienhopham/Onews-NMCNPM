'use strict';

angular.module('Onews').config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
function($httpProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('common', {
      abstract: true,
    })
    .state('dashboard', {
      url: '/dashboard',
      parent: 'common',
    })
    .state('crm', { 
      url: '/crm',
      parent: 'common',
    })
    .state('login', {
      url: '/login',
    });

  $urlRouterProvider.otherwise('/crm');
}
]);