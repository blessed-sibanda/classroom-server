const { Router } = require('express');
const { requireAuth } = require('../services/auth.service');
const { courseById } = require('../middlewares/course.middleware');
const enrollmentCtrl = require('../controllers/enrollment.controller');
const {
  enrollmentById,
  isStudent,
} = require('../middlewares/enrollment.middleware');

const router = Router();

router.param('courseId', courseById);

router.param('enrollmentId', enrollmentById);

router.post('/:courseId', requireAuth, enrollmentCtrl.create);

router.get('/:enrollmentId', requireAuth, isStudent, enrollmentCtrl.read);

module.exports = router;
