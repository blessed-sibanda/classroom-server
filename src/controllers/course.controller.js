const formidable = require('formidable');

const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { removeFile } = require('../helpers/upload.helper');
const { formatError } = require('../helpers/error.helper');
const Course = require('../models/course.model');

module.exports.create = async (req, res) => {
  try {
    let course;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      course = new Course(fields);
      course.instructor = req.auth.id;
    });

    await uploadSingleFile(req, res);

    if (req.file) {
      course.image = req.file.filename;
    }

    await course.save();

    return res.json(course);
  } catch (err) {
    return res.status(400).json(formatError(err));
  }
};

module.exports.getCoursesByInstructor = async (req, res) => {
  try {
    let courses = await Course.find({
      instructor: req.params.instructorId,
    }).populate('instructor', '_id name');
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

module.exports.read = async (req, res) => {
  res.json(req.course);
};
