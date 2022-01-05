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

    res.json({});
  } catch (err) {
    next(err);
  }
};
