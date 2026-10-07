const router = require('express').Router();
const ctrl = require('../controllers/visit.controller');
const validate = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');
const schemas = require('../validators/schemas');

router.get('/visit-types', ctrl.listTypes);
router.post('/visits', authenticate, validate(schemas.createVisit), ctrl.create);
router.get('/visits', authenticate, ctrl.listMine);
router.get('/visits/:id/qr', authenticate, ctrl.getPass);
router.patch('/visits/:id/cancel', authenticate, ctrl.cancel);

module.exports = router;
