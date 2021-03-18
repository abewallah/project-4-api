const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../middlewares/auth');

router.get('/', controllers.users.index);

router.post('/register', controllers.users.create);

router.post('/profile', auth, controllers.users.getProfile);

router.put('/:id',  controllers.users.update);

router.delete('/:id', controllers.users.destroy);

module.exports = router;
