(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('UserService', UserService);

  UserService.$inject = ['$http'];
  function UserService($http) {
    var service = {};

    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;

    return service;

    function GetByUsername(username) {
      return $http.get('/user/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user) {
      return $http.post('/user/create', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
      return $http.post('/user/update', user).then(handleSuccess, handleError('Error updating user'));
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
