const { Router } = require('express');
const {
  requireAuth,
  isEducator,
  isCourseOwner,
} = require('../services/auth.service');
const courseCtrl = require('../controllers/course.controller');
const { courseById } = require('../middlewares/course.middleware');

const router = Router();

router.post('/', requireAuth, isEducator, courseCtrl.create);

router.get('/', courseCtrl.listPublished);

router.get(
  '/instructor/:instructorId',
  requireAuth,
  courseCtrl.getCoursesByInstructor,
);

router.param('courseId', courseById);

router.get('/:courseId', courseCtrl.read);

router.put(
  '/:courseId',
  requireAuth,
  isEducator,
  isCourseOwner,
  courseCtrl.updateCourse,
);

router.post(
  '/:courseId/lessons',
  requireAuth,
  isEducator,
  isCourseOwner,
  courseCtrl.newLesson,
);

router.delete(
  '/:courseId/lessons/:lessonId',
  requireAuth,
  isEducator,
  isCourseOwner,
  courseCtrl.deleteLesson,
);

router.delete(
  '/:courseId',
  requireAuth,
  isEducator,
  isCourseOwner,
  courseCtrl.deleteCourse,
);

module.exports = router;
