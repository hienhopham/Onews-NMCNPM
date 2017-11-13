'use strict';

angular.module('Onews').config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
  function ($locationProvider, $httpProvider, $stateProvider, $routeProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'frontend/home/home.html',
        controller: 'homeController'
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

    $routeProvider.otherwise('/home');

    $locationProvider.hashPrefix('');
  }
]);