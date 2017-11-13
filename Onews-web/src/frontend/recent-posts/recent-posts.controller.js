(function() {
  'use strict';

  angular.module('Onews')
    .controller('recentPostsController', function() {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {
        self.articles = [
          {
            title: 'The section of the mass media industry that focuses on presenting',
            thumbnail: 'images/article1.jpg',
            content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
            created_time: 'On Feb 25, 2015'
          },
          {
            title: 'The section of the mass media industry that focuses on presenting',
            thumbnail: 'images/article1.jpg',
            content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
            created_time: 'On Feb 25, 2015'
          },
          {
            title: 'The section of the mass media industry that focuses on presenting',
            thumbnail: 'images/article1.jpg',
            content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
            created_time: 'On Feb 25, 2015'
          }
        ];

      }

    });
})();