(function() {
  'use strict';

  angular.module('Onews')
    .controller('responsesController', ['$compile', '$scope', '$element', function($compile, $scope, $element) {
      var self = this;

      self.$onInit = $onInit;
      self.addResponse = addResponse;

      function $onInit() {
        self.responses = [
          {
            id: 4,
            id_user: 3,
            content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
            created_time: 'On Feb 25, 2015'
          },
          {
            id: 4,
            id_user: 3,
            content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
            created_time: 'On Feb 25, 2015'
          },
          {
            id: 4,
            id_user: 3,
            content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
            created_time: 'On Feb 25, 2015'
          }
        ];

      }

      function addResponse() {
        var elem, template, newElt;

        self.response = {
          id: 4,
          id_user: 3,
          content: 'The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....',
          created_time: 'On Feb 25, 2015'
        };

        elem = angular.element('<response></response>');
        elem.attr({
          response: 'ctrl.response'
        });
        template = angular.element(elem);
        newElt = $compile(template)($scope);

        $element.find('.response').append(newElt);

      }

    }]);
})();