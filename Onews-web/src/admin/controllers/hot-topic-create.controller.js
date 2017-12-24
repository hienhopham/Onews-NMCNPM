(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('hotTopicCreateController', hotTopicCreateController);

    hotTopicCreateController.$inject = ['$scope', '$rootScope', 'HotTopicService'];
  function hotTopicCreateController($scope, $rootScope, HotTopicService) {
    var self = this;

    self.$onInit = onInit;

    $scope.createHotTopic = createHotTopic;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }
    }

    function createHotTopic() {
      var hotTopic = angular.copy($scope.hotTopic);

      hotTopic.created_time = new Date();

      HotTopicService.Create(hotTopic)
        .then(function(response) {
          if(response.success) {
            window.location.reload('/#/admin/manage/hot-topics');
          } else {
            $scope.error = 'Can not create hot topic.';
          }
        });

    }

  }

})();
