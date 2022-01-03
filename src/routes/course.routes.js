const { Router } = require('express');
const { requireAuth, isEducator } = require('../services/auth.service');
const courseCtrl = require('../controllers/course.controller');

const router = Router();

router.post('/', requireAuth, isEducator, courseCtrl.create);

router.get(
  '/instructor/:instructorId',
  requireAuth,
  courseCtrl.getCoursesByInstructor,
);

module.exports = router;
