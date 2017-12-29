(function() {
  'use strict';

  angular.module('Onews')
    .controller('responsesController', ['$compile', '$timeout', '$scope', '$element', '$rootScope', 'CommentService', function($compile, $timeout, $scope, $element, $rootScope, CommentService) {
      var self = this;

      self.$onInit = $onInit;
      self.addResponse = addResponse;

      function $onInit() {
        if($rootScope.globals.currentUser) {
          self.user = $rootScope.globals.currentUser;
        }

        $timeout(function() {
          CommentService.GetByArticle(self.article)
          .then(function(response) {
            self.responses = angular.copy(response.comment_list);
          });
        });

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

              self.addedComment = angular.copy(response.comment);

              elem = angular.element('<response></response>');
              elem.attr({
                response: 'ctrl.addedComment'
              });
              template = angular.element(elem);
              newElt = $compile(template)($scope);
      
              $element.find('.response').prepend(newElt);

            } else {
              self.error = "Không thể bình luận.";
            }
            self.content = '';

          })



      }

    }]);
})();