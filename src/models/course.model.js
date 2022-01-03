const mongoose = require('mongoose');
const config = require('../config');

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
