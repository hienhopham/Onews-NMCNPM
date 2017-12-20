(function () {
  'use strict';

  angular.module('Onews')
    .run(run);

  run.$inject = ['$rootScope', '$state', '$cookies', '$http', '$document'];
  function run($rootScope, $state, $cookies, $http, $document) {
    $rootScope.$state = $state;

    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$viewContentLoaded',
      function (event) {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 100;
      });

    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //   // redirect to login page if not logged in and trying to access a restricted page
    //   var restrictedPage = $.inArray($location.path(), ['/home', '/register']) === -1;
    //   var loggedIn = $rootScope.globals.currentUser;
    //   if (restrictedPage && !loggedIn) {
    //     $location.path('/home');
    //   }
    // });
  }
})();