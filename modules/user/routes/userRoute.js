const express = require("express");
const { registerUser } = require("../controllers/registerController");
const { userLogin } = require("../controllers/loginController");
const {
  sendOtpEmail,
  verifyOtpAndUpdate,
} = require("../controllers/userController");
const { verifyUser } = require("../../../utils/authentication/verifyUser");
const router = express.Router();
// const userController = require("../../../controller/admin/user/userController");
// const { checkLogin } = require("../../../middleware/token/checkLogin");

// router.get(
//   "/getAllUserData",
//   checkLogin,
//   userController.getProfileDataOfAllExistingUser
// );
router.post("/login", userLogin);
router.post("/register", registerUser);
// router.put("/updateUser", updateUser);
router.put("/sendOtpEmail", verifyUser, sendOtpEmail);
router.put("/verifyOtp", verifyUser, verifyOtpAndUpdate);
module.exports = router;
