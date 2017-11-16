(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('loginController', loginController);

  loginController.$inject = ['$location', '$scope', 'AuthenticationService', 'FlashService'];
  function loginController($location, $scope, AuthenticationService, FlashService) {
    var self = this;

    self.gmail = {
      username: '',
      email: ''
    };
    self.facebook = {
      username: '',
      email: ''
    };

    self.$onInit = onInit;
    self.login = login;
    self.loginByGoogle = loginByGoogle;
    self.loginByFacebook = loginByFacebook;

    function onInit() {
      // reset login status
      AuthenticationService.ClearCredentials();
    }

    function login() {
      self.dataLoading = true;
      AuthenticationService.Login(self.username, self.password, function (response) {
        if (response.success) {
          AuthenticationService.SetCredentials(self.username, self.password);
          $location.path('/');
        } else {
          FlashService.Error(response.message);
          self.dataLoading = false;
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
                  $scope.$apply(function() {
                    self.gmail.username = userInfo.displayName;
                    self.gmail.email = userInfo.emails[0];
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
      FB.login(function(response) {
        if(response.authResponse) {
          FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture'}, function(response) {
            $scope.$apply(function() {
              self.facebook.username = response.name;
              self.facebook.email = response.email;
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
