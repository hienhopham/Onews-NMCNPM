var express = require('express');
var router = express.Router();

var hot_topic_controller = require('../controllers/hotTopicController');

router.post('/list-all', hot_topic_controller.hot_topic_list_all);

router.post('/find-by-id', hot_topic_controller.hot_topic_by_id);

module.exports = router;
