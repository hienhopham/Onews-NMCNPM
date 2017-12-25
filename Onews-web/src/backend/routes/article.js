var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

var article_controller = require('../controllers/articleController');

router.post('/list-by-category', article_controller.article_list_by_category);

router.post('/list-by-hot-topic', article_controller.article_list_by_hot_topic);

router.post('/list-by-time-order', article_controller.article_list_by_time_order);

router.post('/find-by-id', article_controller.article_by_id);

router.post('/find-by-search-key', article_controller.articles_by_serch_key);

router.post('/create', article_controller.article_create_post);

router.post('/upload', multipartyMiddleware, article_controller.article_upload_file);

router.post('/update', article_controller.article_update_post);

router.post('/delete', article_controller.article_delete_post);

module.exports = router;
