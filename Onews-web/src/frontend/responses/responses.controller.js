(function() {
  'use strict';

  angular.module('Onews')
    .controller('responsesController', ['$compile', '$scope', '$element', '$rootScope', 'CommentService', function($compile, $scope, $element, $rootScope, CommentService) {
      var self = this;

      self.$onInit = $onInit;
      self.addResponse = addResponse;

      function $onInit() {
        if($rootScope.globals.currentUser) {
          self.user = $rootScope.globals.currentUser;
        }
        console.log(self.article);
        CommentService.GetByArticle(self.article)
          .then(function(response) {
            console.log(response);
          });

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
          user_id: $rootScope.globals.currentUser._id,
          article_id: self.article,
          content: self.content,
          created_time: new Date()
        };

        CommentService.Create(self.response)
          .then(function(response) {
            if(response.success) {

              self.addedComment = response.comment;

              elem = angular.element('<response></response>');
              elem.attr({
                response: 'ctrl.addedComment'
              });
              template = angular.element(elem);
              newElt = $compile(template)($scope);
      
              $element.find('.response').append(newElt);

            } else {
              self.error = "Không thể bình luận.";
            }

          })



      }

    }]);
})();