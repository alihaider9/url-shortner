var router = require('express').Router();
var userCtrl = require('../controllers/users.ctrl');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;