const express = require("express");
const { registerUser } = require("../controllers/registerController");
const { userLogin } = require("../controllers/loginController");
const {
  sendOtpEmail,
  verifyOtpAndUpdate,
  updateUserAvatar,
} = require("../controllers/userController");
const { verifyUser } = require("../../../common/middlewares/verifyUser");
const upload = require("../../../common/middlewares/multer");
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
router.put("/verifyOtpAndUpdate", verifyUser, verifyOtpAndUpdate);
router.put(
  "/updateProfilePicture",
  upload.fields([{ name: "profilePicture" }]),
  verifyUser,
  updateUserAvatar
);
module.exports = router;
