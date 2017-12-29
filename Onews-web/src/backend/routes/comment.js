var express = require('express');
var router = express.Router();

var comment_controller = require('../controllers/commentController');

router.post('/create', comment_controller.comment_create);

router.post('/comment-by-article', comment_controller.comment_by_article);

router.post('/all', comment_controller.comment_all);

router.post('/comment-by-id', comment_controller.comment_by_id);

router.post('/update', comment_controller.comment_update_post);

router.post('/delete', comment_controller.comment_delete_post);

router.post('/count-by-article', comment_controller.comment_count_by_article);

module.exports = router;