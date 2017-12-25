(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('ArticleService', ArticleService);

  ArticleService.$inject = ['$http'];
  function ArticleService($http) {
    var service = {};

    service.GetByCategory = GetByCategory;
    service.GetByHotTopic = GetByHotTopic;
    service.GetListTimeOrder = GetListTimeOrder;
    service.GetById = GetById;
    service.GetListBySearchKey = GetListBySearchKey;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetByCategory(categoryID, limit) {
      // limit = limit ? limit : 5;

      return $http.post('/article/list-by-category', {category_id: categoryID, limit: limit}).then(handleSuccess, handleError('Error getting article list by category'));
    }

    function GetByHotTopic(hotTopicID, limit) {
      // limit = limit ? limit : 5;

      return $http.post('/article/list-by-hot-topic', {hot_topic_id: hotTopicID, limit: limit}).then(handleSuccess, handleError('Error getting article list by hot topic'));
    }

    function GetListTimeOrder(limit) {
      limit = limit ? limit : 5;

      return $http.post('/article/list-by-time-order', {limit: limit}).then(handleSuccess, handleError('Error getting articles'));
    }

    function GetById(id) {
      return $http.post('/article/find-by-id', {id: id}).then(handleSuccess, handleError('Error getting article by id'));
    }

    function GetListBySearchKey(searchKey, limit) {
      // limit = limit ? limit : 5;

      return $http.post('/article/find-by-search-key', {searchKey: searchKey,limit: limit}).then(handleSuccess, handleError('Error getting articles'));
    }

    function Create(article) {
      return $http.post('/article/create', article).then(handleSuccess, handleError('Error creating article'));
    }

    function Update(article) {
      return $http.post('/article/update', article).then(handleSuccess, handleError('Error updating article'));
    }

    function Delete(id) {
      return $http.post('/article/delete', {id: id}).then(handleSuccess, handleError('Error delete article'));
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
