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
        })
        .state('info', {
          url: '/personal-info',
          views: {
            'content': {
              templateUrl: 'frontend/partials/user-info/user-info.template.html',
              controller: 'userInfoController'
            }
          }
        })
        .state('category', {
          url: '/category/:id',
          views: {
            'content': {
              templateUrl: 'frontend/partials/category/category.template.html',
              controller: 'categoryController'
            }
          }
        });

      $urlRouterProvider.otherwise('/');

      $locationProvider.hashPrefix('');
    }
  ]);