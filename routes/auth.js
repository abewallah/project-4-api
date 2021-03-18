const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const auth = require('../middlewares/auth')


// Current Path = '/auth/

router.post('/login', authCtrl.login);

router.post('/verify', auth, authCtrl.verify);

module.exports = router;
