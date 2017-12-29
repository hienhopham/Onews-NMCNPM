(function () {
  'use strict';

  angular.module('Onews')
    .controller('responseController', ['$timeout', '$rootScope', 'CommentService', function ($timeout, $rootScope, CommentService) {
      var self = this;

      self.$onInit = $onInit;
      self.deleteComment = deleteComment;
      self.saveComment = saveComment;
      
      self.available = false;

      function $onInit() {
        if ($rootScope.globals.currentUser) {
          self.user = angular.copy($rootScope.globals.currentUser);
          if (self.user.id == self.response.user_id.id) {
            self.available = true;
          }
        }
        self.comment = angular.copy(self.response);
        self.newContent = angular.copy(self.comment.content);
      }

      function deleteComment() {
        CommentService.Delete(self.comment.id)
          .then(function (response) {
            if (response.success) {
              window.location.reload();
            } else {
              self.error = 'Can not delete';
            }

          });
      }

      function saveComment() {
        var comment = angular.copy(self.response);

        if(self.newContent) {
          comment.content = angular.copy(self.newContent);
        }
        $timeout(function() {
          CommentService.Update(comment)
          .then(function (response) {

            if (response.success) {
              self.response = response.comment;
              window.location.reload();
            } else {
              self.error = 'Can not update';
            }
          }, 100);
        });

      }
    }]);
})();