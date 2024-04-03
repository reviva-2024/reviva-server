const Admin = require("../models/adminModel");

const getAdminByData = async (data) => {
  try {
    const user = await Admin.findOne(data);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

// const createAdmin = async (userData) => {
//   try {
//     const newUser = new Admin(userData);
//     await newUser.save();
//     return newUser;
//   } catch (error) {
//     throw new Error("Error creating user: " + error.message);
//   }
// };

module.exports = { getAdminByData };
