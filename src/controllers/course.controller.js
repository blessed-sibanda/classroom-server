const formidable = require('formidable');
const merge = require('lodash/merge');

const { uploadSingleFile } = require('../middlewares/upload.middleware');
const { removeFile } = require('../helpers/upload.helper');
const { formatError } = require('../helpers/error.helper');
const Course = require('../models/course.model');
const { Lesson } = require('../models/lesson.model');

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

module.exports.newLesson = async (req, res, next) => {
  try {
    let lesson = await Lesson.create(req.body);
    let result = await Course.findByIdAndUpdate(
      req.course._id,
      { $addToSet: { lessons: lesson } },
      { new: true },
    ).populate('instructor', '_id name');
    res.json(result);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};

const cleanedCourseData = (course, data) => {
  delete data._id;
  delete data.image;
  delete data.instructor;
  delete data.lessons;

  return merge(course, data);
};

module.exports.updateCourse = async (req, res) => {
  let course = req.course;
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      course = cleanedCourseData(course, fields);
    });

    await uploadSingleFile(req, res);

    if (req.file) {
      await removeFile(course.image);
      course.image = req.file.filename;
    } else {
      user = cleanedCourseData(course, req.body);
    }

    await course.save();
    let updatedCourse = await Course.findById(course._id).populate(
      'instructor',
      '_id name',
    );
    return res.json(updatedCourse);
  } catch (err) {
    res.status(400).json(formatError(err));
  }
};
