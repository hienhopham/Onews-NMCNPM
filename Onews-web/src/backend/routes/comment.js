var express = require('express');
var router = express.Router();

var comment_controller = require('../controllers/commentController');

router.post('/create', comment_controller.comment_create);

router.post('/comment-by-article', comment_controller.comment_by_article);

module.exports = router;