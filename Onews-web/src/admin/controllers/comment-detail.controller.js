(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('commentDetailController', commentDetailController);

  commentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'CommentService'];
  function commentDetailController($scope, $rootScope, $stateParams, CommentService) {
    var self = this;

    self.$onInit = onInit;

    $scope.category = {};
    $scope.deleteComment = deleteComment;
    $scope.saveComment = saveComment;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      } else {

        CommentService.GetById($stateParams.id)
          .then(function (response) {
            if (response.success) {
              $scope.comment = angular.copy(response.comment);
            } else {
              window.location.href = '/#/admin/manage/comments';
            }
          });
      }
    }

    function saveComment() {
      var comment = angular.copy($scope.comment);

      CommentService.Update(comment)
        .then(function(response) {

          if(response.success) {
            $scope.comment = response.comment;
            window.location.reload();
          } else {
            $scope.error = 'Can not update';
          }

        });
    }

    function deleteComment() {
      CommentService.Delete($stateParams.id)
        .then(function(response) {
          if(response.success) {
            window.location.reload('/#/admin/manage/comments');
          } else {
            $scope.error = 'Can not delete';
          }

        });
    }

  }

})();
