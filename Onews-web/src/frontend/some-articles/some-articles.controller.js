(function() {
  'use strict';

  angular.module('Onews')
    .controller('someArticlesController', function() {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {
        self.categories = [
          {
            id: 1,
            name: 'Giải trí'
          },
          {
            id: 2,
            name: 'Xã hội'
          }
        ];
      }

    });
})();