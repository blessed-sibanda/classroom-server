const Enrollment = require('../models/enrollment.model');

const findEnrollment = async (req, res, next) => {
  try {
    let enrollments = await Enrollment.find({
      course: req.course._id.toString(),
      student: req.auth.id,
    });

    if (enrollments.length === 0) next();
    else
      res.status(400).json({ message: 'You are already enrolled in this course' });
  } catch (err) {
    next(err);
  }
};

const enrollmentById = async (req, res, next, id) => {
  try {
    let enrollment = await Enrollment.findById(id)
      .populate({
        path: 'course',
        populate: { path: 'instructor', select: '_id name' },
        select: '-lessons',
      })
      .populate('student', '_id name')
      .populate({
        path: 'lessonStatus',
        populate: { path: 'lesson' },
      });

    if (!enrollment)
      return res.status(404).json({ message: 'Enrollment not found' });
    req.enrollment = enrollment;
    next();
  } catch (err) {
    next(err);
  }
};

const isStudent = async (req, res, next) => {
  const isStudent =
    req.auth && req.auth.id === req.enrollment.student._id.toString();
  if (!isStudent) return res.status(403).json({ message: 'User is not enrolled' });
  next();
};

module.exports = { findEnrollment, enrollmentById, isStudent };
