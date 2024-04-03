const express = require("express");
const router = express.Router();
const userRoutes = require("./modules/user/routes/userRoute");
const adminRoutes = require("./modules/user/routes/adminRoute");

// Define your routes here
router.get("/example", (req, res) => {
  res.send("Example route");
});
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
