const expressAsyncHandler = require("express-async-handler");
const { getCourse } = require("../service/courseService");
const Course = require("../models/courseModel");

const getAllCourses = expressAsyncHandler(async (req, res) => {
  try {
    const course = await getCourse();
    res.status(200).json({
      message: "Courses Fetched Successfully",
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error While Getting The Courses",
      success: false,
      err,
    });
  }
});

const addCourse = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  const result = new Course(data);
  await result.save();
  res.send(result);
});

module.exports = { getAllCourses,addCourse };
