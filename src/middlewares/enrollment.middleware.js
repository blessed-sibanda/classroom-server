const Enrollment = require('../models/enrollment.model');

const findEnrollment = async (req, res, next) => {
  try {
    let enrollments = await Enrollment.find({
      course: req.course._id,
      student: req.auth.id,
    });
    if (enrollments.length === 0) next();
    else res.json(enrollments[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = { findEnrollment };
