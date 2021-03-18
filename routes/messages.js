const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.messages.index);
router.post('/', controllers.messages.create);
router.get('/:id', controllers.messages.show);
router.delete('/:id', controllers.messages.destroy);

module.exports = router;
