const express = require("express");
const { userLoginController } = require("../controllers/loginController");
const { registerController } = require("../controllers/registerController");
const router = express.Router();
// const userController = require("../../../controller/admin/user/userController");
// const { checkLogin } = require("../../../middleware/token/checkLogin");

// router.get(
//   "/getAllUserData",
//   checkLogin,
//   userController.getProfileDataOfAllExistingUser
// );
router.get("/login", userLoginController);
router.post("/register", registerController);

module.exports = router;
