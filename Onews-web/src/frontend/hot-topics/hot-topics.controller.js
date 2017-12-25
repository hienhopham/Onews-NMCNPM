(function () {
  'use strict';

  angular.module('Onews')
    .controller('hotTopicsController', hotTopicsController);

  hotTopicsController.$inject = ['HotTopicService'];

  function hotTopicsController(HotTopicService) {

    var self = this;

    self.$onInit = onInit;

    function onInit() {
      HotTopicService.GetAll(5)
        .then(function (response) {
          if (response.success) {
            self.hotTopics = response.hot_topic_list;
          } else {
            self.hotTopics = [
              {
                id: 1,
                name: 'The section of the mass media industry that focuses on presenting 1'
              },
              {
                id: 2,
                name: 'The section of the mass media industry that focuses on presenting 2'
              },
              {
                id: 3,
                name: 'The section of the mass media industry that focuses on presenting 3'
              }
            ];
          }
        })
    }
  }
})();