(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('HotTopicService', HotTopicService);

  HotTopicService.$inject = ['$http'];
  function HotTopicService($http) {
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      return $http.post('/hottopic/list-all').then(handleSuccess, handleError('Error getting all hot topics'));
    }

    function GetById(id) {
      return $http.post('/hottopic/find-by-id', {id: id}).then(handleSuccess, handleError('Error getting hot topic by id'));
    }

    function Create(hotTopic) {
      return $http.post('/hottopic/create', hotTopic).then(handleSuccess, handleError('Error creating hot topic'));
    }

    function Update(hotTopic) {
      return $http.post('/hottopic/update', hotTopic).then(handleSuccess, handleError('Error updating hot topic'));
    }

    function Delete(id) {
      return $http.post('/hottopic/delete', { id: id }).then(handleSuccess, handleError('Error delete hot topic'));
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
