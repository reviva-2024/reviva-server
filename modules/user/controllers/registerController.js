const asyncHandler = require("express-async-handler");
const { createUser } = require("../userService");

const registerController = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    res.status(200).json({ message: "User Registered  successful",success: true, user });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "User Registered Failed",
        success: false,
        error: error.message,
      });
  }
});

module.exports = { registerController };
