const express = require("express");
const { adminLoginController } = require("../controllers/loginController");
// const {
//   adminRegisterController,
// } = require("../controllers/registerController");
const router = express.Router();

router.post("/login", adminLoginController);
// router.post("/register", adminRegisterController);

module.exports = router;
