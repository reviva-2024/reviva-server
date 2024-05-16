const express = require("express");
const { getAllCourses, addCourse } = require("../controllers/courseController");
const router = express.Router();

router.get("/getAllCourses", getAllCourses);
router.post("/addCourse", addCourse);
module.exports = router;
