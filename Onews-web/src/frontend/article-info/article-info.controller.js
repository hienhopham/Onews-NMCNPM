(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('articleInfoController', articleInfoController);

  articleInfoController.$inject = ['CommentService'];
  function articleInfoController(CommentService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      CommentService.CountByArticle(self.article.id)
        .then(function (response) {
          if (response.success) {
            self.number_of_comments = response.number_of_comments;
          } else {
            self.number_of_comments = 0;
          }
        });
    }
  }

})();
