const express = require("express");
const { registerUser } = require("../controllers/registerController");
const { userLogin } = require("../controllers/loginController");
const {
  sendOtpEmail,
  verifyOtpAndUpdate,
  updateUserAvatar,
  sendForgotEmail,
  verifyOtpAndForgotPassword,
  updateQuizMark,
} = require("../controllers/userController");
const { verifyUser } = require("../../../common/middlewares/verifyUser");
const upload = require("../../../common/middlewares/multer");
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", registerUser);
// router.put("/updateUser", updateUser);
router.put("/sendOtpEmail", verifyUser, sendOtpEmail);
router.put("/verifyOtpAndUpdate", verifyUser, verifyOtpAndUpdate);
router.put("/sendForgotEmail", sendForgotEmail);
router.put("/verifyOtpAndForgotPassword", verifyOtpAndForgotPassword);
router.put(
  "/updateProfilePicture",
  upload.fields([{ name: "profilePicture" }]),
  verifyUser,
  updateUserAvatar
);
router.put("/updateQuizMark", verifyUser, updateQuizMark);
module.exports = router;
