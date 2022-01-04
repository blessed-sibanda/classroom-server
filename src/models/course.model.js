const mongoose = require('mongoose');
const config = require('../config');

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  resource_url: String,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
    },
    description: {
      type: String,
      trim: true,
    },
    image: String,
    published: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: String,
    lessons: [lessonSchema],
  },
  { timestamps: true },
);

courseSchema.virtual('imageUrl').get(function () {
  if (this.image) {
    return config.filesUrl + this.image;
  } else return '';
});

courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
