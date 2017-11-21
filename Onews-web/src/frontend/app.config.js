'use strict';

angular.module('Onews')
  .config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          views: {
            'content': {
              templateUrl: 'frontend/partials/home/home.template.html',
              controller: 'homeController'
            }
          }
        })
        .state('article', {
          url: '/article/:id',
          views: {
            'content': {
              templateUrl: 'frontend/partials/single-article/single-article.template.html',
              controller: 'singleArticleController'
            }
          }
        });

      $urlRouterProvider.otherwise('/');

      $locationProvider.hashPrefix('');
    }
  ]);