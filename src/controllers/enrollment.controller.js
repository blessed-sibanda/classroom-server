const { formatError } = require('../helpers/error.helper');
const Enrollment = require('../models/enrollment.model.js');

module.exports.create = async (req, res) => {
  let newEnrollment = { course: req.course._id, student: req.auth.id };
  newEnrollment.lessonStatus = req.course.lessons.map((lesson) => {
    return { lesson, complete: false };
  });
  try {
    let enrollment = await Enrollment.create(newEnrollment);
    res.json(enrollment);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

module.exports.read = async (req, res) => res.json(req.enrollment);

module.exports.complete = async (req, res, next) => {
  try {
    let updateData = {};
    updateData['lessonStatus.$.complete'] = true;
    await Enrollment.updateOne(
      { 'lessonStatus._id': req.params.lessonStatusId },
      { $set: updateData },
    );
    let enrollment = await Enrollment.findById(req.params.enrollmentId);
    let complete = enrollment.lessonStatus.every((l) => l.complete);
    enrollment.completed = complete ? Date.now() : null;

    await enrollment.save();

    res.json({});
  } catch (err) {
    next(err);
  }
};

module.exports.uncomplete = async (req, res, next) => {
  try {
    let updateData = {};
    updateData['lessonStatus.$.complete'] = false;
    await Enrollment.updateOne(
      { 'lessonStatus._id': req.params.lessonStatusId },
      { $set: updateData },
    );
    await Enrollment.findByIdAndUpdate(req.params.enrollmentId, { completed: null });

    res.json({});
  } catch (err) {
    next(err);
  }
};

module.exports.listEnrolled = async (req, res, next) => {
  try {
    let enrollments = await Enrollment.find({ student: req.auth.id })
      .sort({ completed: 1 })
      .populate('course', '_id name category image imageUrl');

    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};
