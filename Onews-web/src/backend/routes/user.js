var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.post('/create', user_controller.user_create_post);

router.post('/authentication', user_controller.user_authenticate_post);

router.post('/update', user_controller.user_update_post);

router.post('/user-list', user_controller.user_list);

router.post('/user-by-id', user_controller.user_detail_id_post);

router.post('/delete', user_controller.user_delete_post);

module.exports = router;