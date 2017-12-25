(function() {
  'use strict';

  angular.module('Onews')
    .controller('responseController', ['$timeout', function($timeout) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {
        self.comment = angular.copy(self.response);
      }
    }]);
})();