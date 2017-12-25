(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('CommentService', CommentService);

  CommentService.$inject = ['$http'];
  function CommentService($http) {
    var service = {};

    service.GetAll = GetAll;
    service.GetByArticle = GetByArticle;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      return $http.post('/comment/all').then(handleSuccess, handleError('Error getting comments'));
    }

    function GetByArticle(article_id) {
      return $http.post('/comment/comment-by-article', {article_id: article_id}).then(handleSuccess, handleError('Error getting comments list by article'));
    }

    function GetById(id) {
      return $http.post('/comment/comment-by-id', {id: id}).then(handleSuccess, handleError('Error getting comment by id'));
    }

    function Create(comment) {
      return $http.post('/comment/create', comment).then(handleSuccess, handleError('Error creating comment'));
    }

    function Update(comment) {
      return $http.post('/comment/update', comment).then(handleSuccess, handleError('Error updating comment'));
    }

    function Delete(id) {
      return $http.post('/comment/delete', { id: id }).then(handleSuccess, handleError('Error delete comment'));
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
