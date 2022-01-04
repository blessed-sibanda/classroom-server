const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Lesson title is required',
  },
  content: {
    type: String,
    required: 'Lesson content is required',
  },
  resource_url: String,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson, lessonSchema };
