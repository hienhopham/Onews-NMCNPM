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
            name: 'Lễ cưới',
            class: 'tag'+getRandomInt()
          },
          {
            id: 2,
            name: 'Hẹn hò'
          },
          {
            id: 3,
            name: 'Chia tay'
          },
          {
            id: 4,
            name: 'Donald Trump'
          },
          {
            id: 5,
            name: 'Apec'
          },
          {
            id: 6,
            name: 'Harry Styles'
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