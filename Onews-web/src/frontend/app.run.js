(function () {
  'use strict';

  angular.module('Onews')
    .run(run);

  run.$inject = ['$rootScope', '$state', '$location', '$cookies', '$http', '$document'];
  function run($rootScope, $state, $location, $cookies, $http, $document) {
    $rootScope.$state = $state;

    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }
    $rootScope.admin = $cookies.getObject('admin') || {};

    $rootScope.$on('$viewContentLoaded',
      function (event) {
        $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 100;
      });

    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //   // redirect to login page if not logged in and trying to access a restricted page
    //   // var restrictedPage = $.inArray($location.path(), ['/home', '/register']) === -1;
    //   // var loggedIn = $rootScope.globals.currentUser;
    //   // if (restrictedPage && !loggedIn) {
    //   //   $location.path('/home');
    //   // }
    //   var restrictedPage = $.inArray($location.path(), ['/#/admin']) === -1;
    //   var admin = $rootScope.admin;
    //   console.log(admin);
    //   if(restrictedPage && admin.username) {
    //     window.location.href = '/#/admin/manage';
    //   }
    //   // if(next == 'http://localhost:8585/#/admin' && admin) {
    //   //   window.location.href = '/#/admin/manage';
    //   //   // $location.path('/#/admin/manage');
    //   // }
    // });
  }
})();