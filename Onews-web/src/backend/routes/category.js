var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController');

router.post('/list-by-level', category_controller.category_list_by_level);

router.post('/list-all', category_controller.category_list_all);

router.post('/find-by-id', category_controller.category_by_id);

router.post('/create', category_controller.category_create_post);

router.post('/update', category_controller.category_update_post);

router.post('/delete', category_controller.category_delete_post);

module.exports = router;
