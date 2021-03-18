const router = require('express').Router();
const controllers = require('../controllers');
// const auth = require('../middlewares/auth');

router.get('/', controllers.chatrooms.index);
router.get('/:id', controllers.chatrooms.show);
router.post('/', controllers.chatrooms.create);
router.put('/:id', controllers.chatrooms.update);
router.delete('/:id', controllers.chatrooms.destroy);

module.exports = router;