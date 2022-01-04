const { Router } = require('express');
const { requireAuth } = require('../services/auth.service');
const { courseById } = require('../middlewares/course.middleware');
const enrollmentCtrl = require('../controllers/enrollment.controller');

const router = Router();

router.param('courseId', courseById);

router.post('/:courseId', requireAuth, enrollmentCtrl.create);

module.exports = router;
