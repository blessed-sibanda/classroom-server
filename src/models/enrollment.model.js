const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lessonStatus: [
      {
        lesson: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
          },
        ],
        complete: Boolean,
      },
    ],
    completed: Date,
  },
  { timestamps: true },
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
