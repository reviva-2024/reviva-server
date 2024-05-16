const Course = require("../models/courseModel");

const getCourse = async (data) => {
  try {
    let course;
    if (data) {
      course = await Course.findOne(data);
      console.log(course);
    } else {
      course = await Course.find();
      console.log(course);
    }
    if (!course) {
      throw new Error("Course Not Found");
    }
    return course;
  } catch (error) {
    console.log(error, "From Get Course");
    throw error;
  }
};
module.exports = { getCourse };
