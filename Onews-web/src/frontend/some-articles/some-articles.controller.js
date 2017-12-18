(function () {
  'use strict';

  angular.module('Onews')
    .controller('someArticlesController', ['CategoryService', function (CategoryService) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {

        CategoryService.GetByLevel(2)
          .then(function (response) {
            if (response.success) {
              var subCategories = angular.copy(response.category_list);
              var i1 = Math.floor(Math.random() * subCategories.length);
              var i2 = Math.floor(Math.random() * subCategories.length);

              if (i1 === i2) {
                i1 = 1;
                i2 = 2;
              }
              self.category1 = subCategories[i1];
              self.category2 = subCategories[i2];

            }
          });
      }

    }]);
})();