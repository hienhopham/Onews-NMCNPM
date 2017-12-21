(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('loginController', loginController);

  loginController.$inject = ['$window', '$rootScope', '$timeout', 'UserService', 'AuthenticationService'];
  function loginController($window, $rootScope, $timeout, UserService, AuthenticationService) {
    var self = this;

    self.$onInit = onInit;
    self.login = login;
    self.loginByGoogle = loginByGoogle;
    self.loginByFacebook = loginByFacebook;

    function onInit() {
      // reset login status
      //AuthenticationService.ClearCredentials();
    }

    function setCurrentUser(currentUser) {
      AuthenticationService.SetCredentials(currentUser);
      $window.location.reload();
    }

    function login() {
      var loginInfo = angular.copy(self.user);

      self.dataLoading = true;
      AuthenticationService.Login(loginInfo, function (response) {
        if (response.data.success) {
          self.error = false;
          setCurrentUser(response.data.user[0]);
        } else {
          self.dataLoading = false;
          self.error = 'Tên tài khoản hoặc mật khẩu không đúng.';
        }
      });
    };

    function loginByGoogle() {
      var params = {
        'clientid': '462321157330-bej2cokpvqfia69egler9tluub43f5nn.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': function (result) {
          if (result['status']['signed_in']) {
            gapi.client.request(
              {
                'path': '/plus/v1/people/me',
                'method': 'GET',
                'callback': function (userInfo) {

                  $rootScope.$apply(function () {

                    var user = {
                      username: userInfo.id,
                      full_name: userInfo.displayName,
                      email: userInfo.emails[0].value,
                      google_id: userInfo.id,
                      type: 'g',
                    };

                    UserService.Create(user)
                      .then(function (response) {
                        if(response.error) {
                          setCurrentUser(response.user[0]);
                        } else {
                          setCurrentUser(user);
                        }
                      });

                  });
                }
              }
            );
          }
        },
        'approvalpromt': 'force',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
      };

      gapi.auth.signIn(params);
    }

    function loginByFacebook() {
      FB.login(function (response) {
        if (response.authResponse) {
          
          FB.api('/me', 'GET', { fields: 'email, first_name, name, id, picture' }, function (response) {
            $rootScope.$apply(function () {

              var user = {
                username: response.id,
                full_name: response.name,
                email: response.email,
                face_id: response.id,
                type: 'f',
              };

              UserService.Create(user)
                .then(function (response) {
                  if(response.error) {
                    setCurrentUser(response.user[0]);
                  } else {
                    setCurrentUser(user);
                  }
            
                });
            })
          })
        } else {
          // error
        }
      }, {
          scope: 'email, user_likes',
          return_scopes: true
        });
    }
  }

})();
