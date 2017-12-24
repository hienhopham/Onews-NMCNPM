(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('hotTopicListController', hotTopicListController);

  hotTopicListController.$inject = ['$scope', '$rootScope', 'HotTopicService'];
  function hotTopicListController($scope, $rootScope, HotTopicService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }

      HotTopicService.GetAll()
        .then(function (response) {
          if (response.success) {
            $scope.hot_topic_list = response.hot_topic_list;
          } else {
            $scope.error = 'No such hot topic.';
          }

        });
    }

  }

})();
