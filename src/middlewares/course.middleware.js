const Course = require('../models/course.model');

const courseById = async (req, res, next, id) => {
  try {
    let course = await Course.findById(id).populate('instructor', '_id name');
    if (!course)
      return res.status(404).json({
        error: 'Course not found',
      });
    req.course = course;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { courseById };
