(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('hotTopicDetailController', hotTopicDetailController);

  hotTopicDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'HotTopicService'];
  function hotTopicDetailController($scope, $rootScope, $stateParams, HotTopicService) {
    var self = this;

    self.$onInit = onInit;

    $scope.category = {};
    $scope.deleteHotTopic = deleteHotTopic;
    $scope.saveHotTopic = saveHotTopic;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      } else {

        HotTopicService.GetById($stateParams.id)
          .then(function (response) {
            if (response.success) {
              var hotTopic = angular.copy(response.hot_topic);

              $scope.hotTopic = hotTopic;

            } else {
              window.location.href = '/#/admin/manage/categories';
            }
          });
      }
    }

    function saveHotTopic() {
      var hotTopic = angular.copy($scope.hotTopic);

      HotTopicService.Update(hotTopic)
        .then(function(response) {

          if(response.success) {
            $scope.hotTopic = response.hot_topic;
            window.location.reload();
          } else {
            $scope.error = 'Can not update';
          }

        });
      window.location.reload();
    }

    function deleteHotTopic() {
      // CategoryService.Delete($stateParams.id)
      //   .then(function(response) {
      //     if(response.success) {
      //       window.location.reload('/#/admin/manage/users');
      //     } else {
      //       $scope.error = 'Can not delete';
      //     }

      //   });
    }

  }

})();
