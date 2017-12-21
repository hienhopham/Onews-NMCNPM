(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('CommentService', CommentService);

  CommentService.$inject = ['$http'];
  function CommentService($http) {
    var service = {};

    service.GetByArticle = GetByArticle;
    service.Create = Create;
    service.Update = Update;

    return service;

    function GetByArticle(article_id) {
      console.log(article_id);
      return $http.post('/comment/comment-by-article', {article_id: article_id}).then(handleSuccess, handleError('Error getting comments list by article'));
    }

    function Create(comment) {
      return $http.post('/comment/create', comment).then(handleSuccess, handleError('Error creating comment'));
    }

    function Update(comment) {
      return $http.post('/comment/update', comment).then(handleSuccess, handleError('Error updating comment'));
    }

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return { success: false, message: error };
      };
    }
  }

})();
