(function() {
  'use strict';

  angular.module('Onews')
    .component('hotTopics', {
      controller: 'hotTopicsController',
      controllerAs: 'ctrl',
      templateUrl: 'frontend/hot-topics/hot-topics.template.html'
    });
})();
