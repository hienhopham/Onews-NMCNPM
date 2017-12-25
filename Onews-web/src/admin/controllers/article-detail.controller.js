(function () {
  'use strict';

  angular
    .module('Onews')
    .controller('articleDetailController', articleDetailController);

  articleDetailController.$inject = ['$scope', '$element', '$timeout', '$compile', '$rootScope', '$stateParams', 'Upload', 'ArticleService', 'CategoryService', 'HotTopicService'];
  function articleDetailController($scope, $element, $timeout, $compile, $rootScope, $stateParams, Upload, ArticleService, CategoryService, HotTopicService) {
    var self = this;

    self.$onInit = onInit;

    $scope.newContent = '';

    $scope.deleteArticle = deleteArticle;
    $scope.uploadPic = uploadPic;
    $scope.addContent = addContent;
    $scope.deleteContent = deleteContent;

    function onInit() {
      if (!$rootScope.admin.username) {
        window.location.href = '/#/admin';
      } else {

        ArticleService.GetById($stateParams.id)
          .then(function (response) {
            if (response.success) {
              var article = angular.copy(response.article);

              if (article.created_time) {
                article.created_time = new Date(article.created_time);
              }

              $scope.article = article;

            } else {
              window.location.href = '/#/admin/manage/categories';
            }
          });

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
    }

    function uploadPic(file) {
      if (typeof file == 'object' && file != null) {

      file.upload = Upload.upload({
        url: 'http://localhost:8585/article/upload',
        method: 'POST',
        file: file,
      });

      file.upload.then(function (response) {
        $timeout(function () {
          if (response.data.success) {
            saveArticle(file.name);
          }
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    } else if (file == null) {
      $scope.error = 'Thumbnail is required';
    } else {
      saveArticle();
    }
    }

    function saveArticle(img) {
      var article = angular.copy($scope.article);

      article.img = img ? 'images/articles/' + img : $scope.article.img;

      if (!article.hot_topic_id) {
        article.hot_topic_id = null;
      }

      ArticleService.Update(article)
        .then(function (response) {

          if (response.success) {
            $scope.article = response.article;
            window.location.reload();
          } else {
            $scope.error = 'Can not update';
          }

        });
      window.location.reload();
    }

    function deleteArticle() {
      ArticleService.Delete($stateParams.id)
        .then(function(response) {
          if(response.success) {
            window.location.reload('/#/admin/manage/articles');
          } else {
            $scope.error = 'Can not delete';
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
