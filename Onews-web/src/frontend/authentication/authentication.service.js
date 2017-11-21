(function () {
  'use strict';

  angular
    .module('Onews')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService', 'Base64Service'];
  function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService, Base64Service) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password, callback) {

      $timeout(function () {
        var response;
        UserService.GetByUsername(username)
          .then(function (user) {
            if (user !== null && user.password === password) {
              response = { success: true , currentUser: user};
            } else {
              response = { success: false, message: 'Username or password is incorrect' };
            }
            callback(response);
          });
      }, 1000);

      /* Use this for real authentication
       ----------------------------------------------*/
      //$http.post('/api/authenticate', { username: username, password: password })
      //    .success(function (response) {
      //        callback(response);
      //    });

    }

    function SetCredentials(currentUser) {

      $rootScope.globals.currentUser = currentUser;
      if(currentUser.password) {
        $rootScope.globals.currentUser.password = Base64Service.encode(currentUser.password);
      }

      //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
    }

    function ClearCredentials() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }

})();