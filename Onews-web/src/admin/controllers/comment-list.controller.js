(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('commentListController', commentListController);

  commentListController.$inject = ['$scope', '$rootScope', 'CommentService'];
  function commentListController($scope, $rootScope, CommentService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }

      CommentService.GetAll()
        .then(function (response) {
          if (response.success) {
            $scope.comment_list = response.comment_list;
          } else {
            $scope.error = 'No such category.';
          }

        });
    }

  }

})();
