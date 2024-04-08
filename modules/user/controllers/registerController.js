const asyncHandler = require("express-async-handler");
const { createUser, getUserByData } = require("../services/userService");
const bcrypt = require("bcrypt");
// const { createAdmin } = require("../services/adminService");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!email || !password || !username || !phone) {
      return res.status(400).json({
        message:
          "Required information is missing. Please provide all necessary details to proceed",
        success: false,
      });
    }
    try {
      const isUserExist = await getUserByData({ $or: [{ email }, { phone }] });
      if (isUserExist) {
        return res.status(500).json({
          message: "Email Or Phone Already Registered",
          success: false,
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User Registered  successful",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "User Registered Failed",
      success: false,
      error: error.message,
    });
  }
});
// const adminRegisterController = asyncHandler(async (req, res) => {
//   try {
//     const { username, email, phone, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await createAdmin({
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//     });
//     res.status(200).json({
//       message: "Admin Registered  successful",
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Admin Registered Failed",
//       success: false,
//       error: error.message,
//     });
//   }
// });

module.exports = { registerUser };
