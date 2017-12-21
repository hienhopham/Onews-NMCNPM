(function() {
  'use strict';

  angular.module('Onews')
    .controller('tagsController', function() {
      var self = this;

      self.$onInit = $onInit;
      self.getRandomInt =getRandomInt;
     

      function $onInit() {
        self.tags = [
          {
            id: 1,
            name: 'Bảo Anh'
          },
          {
            id: 2,
            name: 'Hồ Quang Hiếu'
          },
          {
            id: 3,
            name: 'Ngô Kiến Huy'
          },
          {
            id: 4,
            name: 'Hồ Quang Hiếu'
          },
          {
            id: 5,
            name: 'Shawn Mendes'
          },
          {
            id: 6,
            name: 'LIME'
          },
          {
            id: 7,
            name: 'Ronaldo'
          }
        ];
      }

      function getRandomInt(min, max) {
        if (!min && !max) {
          min = 1;
          max = 20;
        }
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
      }

    });
})();