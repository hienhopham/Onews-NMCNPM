var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.post('/create', user_controller.user_create_post);

router.post('/authentication', user_controller.user_authenticate_post);

router.post('/update', user_controller.user_update_post);

module.exports = router;