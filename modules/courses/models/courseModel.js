const mongoose = require("mongoose");

// Define the schema for the Course
const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    enum: ["free", "paid"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      videoLink: {
        type: String,
        required: true,
      },
    },
  ],
});

// Define the Course model
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
