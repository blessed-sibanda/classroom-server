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

router.delete('/:enrollmentId', requireAuth, isStudent, enrollmentCtrl.delete);

router.get('/:courseId/stats', requireAuth, enrollmentCtrl.stats);

router.get('/:courseId/is-enrolled', requireAuth, enrollmentCtrl.isEnrolled);

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

router.get('/', requireAuth, enrollmentCtrl.listEnrolled);

module.exports = router;
