(function() {
  'use strict';

  angular.module('Onews')
    .controller('responseController', ['$timeout', function($timeout) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {

          console.log(self.response.user_id.full_name);
        
      }
    }]);
})();