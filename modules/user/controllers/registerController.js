const asyncHandler = require("express-async-handler");
const { createUser } = require("../services/userService");
const bcrypt = require("bcrypt");
// const { createAdmin } = require("../services/adminService");

const registerController = asyncHandler(async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
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

module.exports = { registerController };
