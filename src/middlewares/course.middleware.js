const Course = require('../models/course.model');

const courseById = async (req, res, next, id) => {
  try {
    let courses = await Course.find({ _id: id }).populate('instructor', '_id name');
    console.log(courses[0]);
    if (courses.length == 0)
      return res.status(404).json({
        error: 'Course not found',
      });
    req.course = courses[0];
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { courseById };
