(function() {
  'use strict';

  angular.module('Onews')
    .component('recentPosts', {
      controller: 'recentPostsController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/recent-posts/recent-posts.template.html'
    });
})();
