var router = require('express').Router();
var userCtrl = require('../controllers/users.ctrl');
var shortenCtrl = require('../controllers/shortenUrls.ctrl');

router.post('/shorten',userCtrl.authRequired, shortenCtrl.shorten);
router.get('/fullUrl/:shortCode', shortenCtrl.fullUrl);
router.get('/',userCtrl.authRequired, shortenCtrl.get);

module.exports = router;