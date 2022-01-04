const { Router } = require('express');
const { requireAuth, isEducator } = require('../services/auth.service');
const courseCtrl = require('../controllers/course.controller');
const { courseById } = require('../middlewares/course.middleware');

const router = Router();

router.post('/', requireAuth, isEducator, courseCtrl.create);

router.get(
  '/instructor/:instructorId',
  requireAuth,
  courseCtrl.getCoursesByInstructor,
);

router.param('courseId', courseById);

router.get('/:courseId', requireAuth, courseCtrl.read);

module.exports = router;
