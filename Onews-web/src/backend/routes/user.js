var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/id=:id', user_controller.user_detail_id);
router.get('/:username', user_controller.user_detail_username);

router.post('/create', user_controller.user_create_post);

router.post('/authentication', user_controller.user_authenticate_post);

// router.get('/:id/update', user_controller.user_update_get);

// router.post('/:id/update', user_controller.user_update_post);
module.exports = router;