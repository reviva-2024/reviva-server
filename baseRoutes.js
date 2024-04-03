const express = require("express");
const router = express.Router();
const userRoutes = require("./modules/user/routes/userRoute");

// Define your routes here
router.get("/example", (req, res) => {
  res.send("Example route");
});
router.use("/user", userRoutes);

module.exports = router;
