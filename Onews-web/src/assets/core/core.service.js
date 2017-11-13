'use strict';

angular.
  module('core.onews').
  factory('Onews', ['$resource',
    function($resource) {
      return $resource('data/categories.json', {}, {
        query: {
          method: 'GET',
          //params: {phoneId: 'phones'},
          isArray: true
        }
      });
    }
  ]);
