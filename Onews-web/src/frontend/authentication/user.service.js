(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('UserService', UserService);

  UserService.$inject = ['$http'];
  function UserService($http) {
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      return $http.post('/user/user-list').then(handleSuccess, handleError('Error getting all users'));
    }

    function GetById(id) {
      return $http.post('/user/user-by-id', {id: id}).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user) {
      return $http.post('/user/create', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
      return $http.post('/user/update', user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
      return $http.post('/user/delete', {id: id}).then(handleSuccess, handleError('Error creating user'));
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
