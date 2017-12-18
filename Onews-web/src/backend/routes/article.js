var express = require('express');
var router = express.Router();

var article_controller = require('../controllers/articleController');

router.post('/list-by-category', article_controller.article_list_by_category);

router.post('/list-by-time-order', article_controller.article_list_by_time_order);

router.post('/find-by-id', article_controller.article_by_id);

module.exports = router;
