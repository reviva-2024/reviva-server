const express = require("express");
const router = express.Router();
const userRoutes = require("./modules/user/routes/userRoute");
const adminRoutes = require("./modules/user/routes/adminRoute");
const quizRoutes = require("./modules/quizes/routes/quizRoutes");
const courseRoutes = require("./modules/courses/routes/courseRoutes");

// Define your routes here
router.get("/example", (req, res) => {
  res.send("Example route");
});
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/quiz", quizRoutes);
router.use("/course", courseRoutes);

module.exports = router;
