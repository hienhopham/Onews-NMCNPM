(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('articleCreateController', articleCreateController);

  articleCreateController.$inject = ['$scope', '$rootScope', '$timeout', '$http', 'Upload', 'ArticleService', 'CategoryService', 'HotTopicService'];
  function articleCreateController($scope, $rootScope, $timeout, $http, Upload, ArticleService, CategoryService, HotTopicService) {
    var self = this;

    $scope.article = {};
    $scope.article.content = [];

    self.$onInit = onInit;

    $scope.createArticle = createArticle;
    $scope.addContent = addContent;
    $scope.deleteContent = deleteContent;
    $scope.uploadPic = uploadPic;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      }

      CategoryService.GetAll()
        .then(function (response) {
          if (response.success) {
            $scope.categories = response.category_list;
          } else {
            $scope.error = 'No such category.';
          }
        });

      HotTopicService.GetAll()
        .then(function (response) {
          if (response.success) {
            $scope.hot_topic_list = response.hot_topic_list;
          } else {
            $scope.error = 'No such hot topic.';
          }

        });
    }

    function uploadPic(file) {

      file.upload = Upload.upload({
        url: 'http://localhost:8585/article/upload',
        method: 'POST',
        file: file,
      });

      file.upload.then(function (response) {
        $timeout(function () {
          if (response.data.success) {
            createArticle(file.name);
          }
        });
      }, function (response) {
        console.log(response);
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }

    function createArticle(img) {
      var article = angular.copy($scope.article);

      article.img = 'images/articles/' + img;
      article.created_time = new Date();
      if (!article.hot_topic_id) {
        article.hot_topic_id = null;
      }

      console.log(article);

      ArticleService.Create(article)
        .then(function(response) {
          console.log(response);
          if(response.success) {
            console.log(response);
            // window.location.reload('/#/admin/manage/articles');
          } else {
            $scope.error = 'Can not create article';
          }
        });

    }

    function addContent() {
      $scope.article.content.push($scope.newContent);
      $scope.newContent = '';
    }

    function deleteContent(index) {
      $scope.article.content.splice(index, 1);
    }

  }

})();
