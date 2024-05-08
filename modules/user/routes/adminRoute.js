const express = require("express");
const { adminLogin } = require("../controllers/loginController");
// const {
//   adminRegisterController,
// } = require("../controllers/registerController");
const router = express.Router();

router.post("/login", adminLogin);
// router.post("/register", adminRegisterController);

module.exports = router;
