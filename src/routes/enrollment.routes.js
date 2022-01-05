const { Router } = require('express');
const { requireAuth } = require('../services/auth.service');
const { courseById } = require('../middlewares/course.middleware');
const enrollmentCtrl = require('../controllers/enrollment.controller');
const {
  enrollmentById,
  isStudent,
  findEnrollment,
} = require('../middlewares/enrollment.middleware');

const router = Router();

router.param('courseId', courseById);

router.param('enrollmentId', enrollmentById);

router.post('/:courseId', requireAuth, findEnrollment, enrollmentCtrl.create);

router.get('/:enrollmentId', requireAuth, isStudent, enrollmentCtrl.read);

router.put(
  '/:enrollmentId/complete/:lessonStatusId',
  requireAuth,
  isStudent,
  enrollmentCtrl.complete,
);

router.delete(
  '/:enrollmentId/complete/:lessonStatusId',
  requireAuth,
  isStudent,
  enrollmentCtrl.uncomplete,
);

module.exports = router;
