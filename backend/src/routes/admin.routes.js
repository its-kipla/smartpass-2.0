const router = require('express').Router();
const ctrl = require('../controllers/admin.controller');
const validate = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');
const requireAdmin = require('../middleware/requireAdmin');
const schemas = require('../validators/schemas');

router.use(authenticate, requireAdmin);

router.get('/visits', ctrl.list);
router.patch('/visits/:id/approve', ctrl.approve);
router.patch('/visits/:id/reject', validate(schemas.reject), ctrl.reject);
router.post('/check-in', validate(schemas.checkIn), ctrl.checkIn);

module.exports = router;
