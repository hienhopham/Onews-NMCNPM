(function () {
  'use strict';

  angular.module('Onews')
    .controller('headerController', ['$rootScope', '$window', 'CategoryService', 'AuthenticationService', function ($rootScope, $window, CategoryService, AuthenticationService) {
      var self = this;

      self.$onInit = onInit;
      self.logout = logout;

      function onInit() {
        var categories = [],
          subCategories = [];

        if ($rootScope.globals.currentUser) {
          self.user = angular.copy($rootScope.globals.currentUser);
        }

        CategoryService.GetAll()
          .then(function (response) {

            var list_categories = angular.copy(response.category_list);

            angular.forEach(list_categories, function (category) {
              if (category.parent_id == null) {
                category.children = [];
                angular.forEach(list_categories, function (subCate) {
                  if (subCate.parent_id == category.id) {
                    category.children.push(subCate);
                  }
                });
                categories.push(category);
              }
            });

            self.menu = {
              name: "Menu",
              children: categories
            };
          });

      }

      function toArray(myObj) {
        var array = [];
        angular.forEach(myObj, function (element) {
          array.push(element);
        });

        return array;
      }

      function logout() {
        AuthenticationService.ClearCredentials();
        $window.location.reload();
      }

    }]);

})();