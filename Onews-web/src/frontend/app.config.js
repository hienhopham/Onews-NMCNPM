'use strict';

angular.module('Onews')
  .config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', 'ngScrollToOptionsProvider',
    function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, ngScrollToOptionsProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'frontend/partials/home/home.template.html',
          controller: 'homeController'
        })
        .state('home.article', {
          url: 'article/:id',
          templateUrl: 'frontend/partials/single-article/single-article.template.html',
          controller: 'singleArticleController'
        })
        .state('home.info', {
          url: 'personal-info',
          templateUrl: 'frontend/partials/user-info/user-info.template.html',
          controller: 'userInfoController'
        })
        .state('home.category', {
          url: 'category/:id',
          templateUrl: 'frontend/partials/category/category.template.html',
          controller: 'categoryController'
        })
        .state('home.searchedArticles', {
          url: 'article/search/:searchKey',
          templateUrl: 'frontend/partials/searched-articles/searched-articles.template.html',
          controller: 'searchedArticlesController'
        })
        .state('home.hotTopic', {
          url: 'hottopic/:id',
          templateUrl: 'frontend/partials/hot-topic/hot-topic.template.html',
          controller: 'hotTopicController'
        })
        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/authentication.template.html',
          controller: 'authenticationController'
        })
        .state('manage', {
          url: '/admin/manage',
          templateUrl: 'admin/manage/layout.html',
          // controller: 'authenticationController'
        })
        .state('manage.users', {
          url: '/users',
          templateUrl: 'admin/manage/user-list.html',
          controller: 'userListController'
        })
        .state('manage.userDetail', {
          url: '/user/:id',
          templateUrl: 'admin/manage/user-detail.html',
          controller: 'userDetailController'
        });

      $urlRouterProvider.otherwise('/');

      $locationProvider.hashPrefix('');

      ngScrollToOptionsProvider.extend({
        handler: function(el) {
            
            $(el).scrollintoview();
        }
    });
    }
  ]);