(function() {
  'use strict';

  angular.module('Onews')
    .controller('headerController', ['$rootScope', 'AUTH_EVENTS', function($rootScope, AUTH_EVENTS) {
      var self = this;

      self.$onInit = onInit;

      function onInit() {
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
          self.curentUser = data;
        });
        self.menu = {
          name : "Menu",
          children: [{
              name: "Child1",
              level: 0,
              children: []
            }, {
              name : "Child2",
              level: 0,
              children: [{
                name : "Grandchild1",
                level: 1,
                children: []
              }, {
                name : "Grandchild2",
                level: 1,
                children: []
              }, {
                name : "Grandchild3",
                level: 1,
                children: []
              }]
            }, {
              name: "Child3",
              level: 0,
              children: []
          }]
        };
      }
      
    }]);

    function headerController() {
      
    }
})();