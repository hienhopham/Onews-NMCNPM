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
          controller: 'authenticationController'
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
        })
        .state('manage.userCreate', {
          url: '/user/create',
          templateUrl: 'admin/manage/user-create.html',
          controller: 'userCreateController'
        })
        .state('manage.categories', {
          url: '/categories',
          templateUrl: 'admin/manage/category-list.html',
          controller: 'categoryListController'
        })
        .state('manage.categoryDetail', {
          url: '/category/:id',
          templateUrl: 'admin/manage/category-detail.html',
          controller: 'categoryDetailController'
        })
        .state('manage.categoryCreate', {
          url: '/category/create',
          templateUrl: 'admin/manage/category-create.html',
          controller: 'categoryCreateController'
        })
        .state('manage.hotTopics', {
          url: '/hot-topics',
          templateUrl: 'admin/manage/hot-topic-list.html',
          controller: 'hotTopicListController'
        })
        .state('manage.hotTopicDetail', {
          url: '/hot-topic/:id',
          templateUrl: 'admin/manage/hot-topic-detail.html',
          controller: 'hotTopicDetailController'
        })
        .state('manage.hotTopicCreate', {
          url: '/hot-topic/create',
          templateUrl: 'admin/manage/hot-topic-create.html',
          controller: 'hotTopicCreateController'
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