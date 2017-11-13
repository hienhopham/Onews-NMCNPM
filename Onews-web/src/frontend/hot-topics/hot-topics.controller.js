(function() {
  'use strict';

  angular.module('Onews')
    .controller('hotTopicsController', hotTopicsController);

    function hotTopicsController() {
      this.hotTopics = [
        {
          id: 1,
          title: 'The section of the mass media industry that focuses on presenting 1'
        },
        {
          id: 2,
          title: 'The section of the mass media industry that focuses on presenting 2'
        },
        {
          id: 3,
          title: 'The section of the mass media industry that focuses on presenting 3'
        }
      ];
    }
})();