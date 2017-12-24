(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('CategoryService', CategoryService);

  CategoryService.$inject = ['$http'];
  function CategoryService($http) {
    var service = {};

    service.GetByLevel = GetByLevel;
    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetByLevel(level) {
      return $http.post('/category/list-by-level', {level: level}).then(handleSuccess, handleError('Error getting categories list by level'));
    }

    function GetAll() {
      return $http.post('/category/list-all').then(handleSuccess, handleError('Error getting all categories'));
    }

    function GetById(id) {
      return $http.post('/category/find-by-id', {id: id}).then(handleSuccess, handleError('Error getting category by id'));
    }

    function Create(category) {
      return $http.post('/category/create', category).then(handleSuccess, handleError('Error creating category'));
    }

    function Update(category) {
      return $http.post('/category/update', category).then(handleSuccess, handleError('Error updating category'));
    }

    function Delete(id) {
      return $http.post('/category/delete', {id: id}).then(handleSuccess, handleError('Error delete category'));
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
