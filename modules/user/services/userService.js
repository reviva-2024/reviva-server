const Otp = require("../models/otpModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const createOtp = async (otpData) => {
  try {
    const newOtp = new Otp(otpData);
    await newOtp.save();
    return newOtp;
  } catch (error) {
    throw new Error("Error creating Otp: " + error.message);
  }
};
const deleteOtp = async (userData) => {
  try {
    const newOtp = await Otp.deleteMany(userData);
    return newOtp;
  } catch (error) {
    throw new Error("Error Deleting Otp: " + error.message);
  }
};
const findUserOtp = async (userData) => {
  try {
    const userOtp = await Otp.findOne(userData);
    if (!userOtp) {
      throw new Error("UserOtp not found");
    }
    return userOtp;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getUserByData = async (data) => {
  try {
    const user = await User.findOne(data);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error, "From GetUser");
    throw error;
  }
};

const updateUserProfilePicture = async (data) => {
  try {
    const { profilePicture, email } = data;
    const user = await User.findOneAndUpdate(
      { email },
      { profilePicture },
      { new: true }
    );
    if (!user) {
      throw new Error("Error While Updating User");
    }
    return user;
  } catch (error) {
    throw new Error("Error While Updating User: " + error.message);
  }
};

const updateUser = async (email, userData) => {
  try {
    console.log(email, userData);
    const user = await User.findOneAndUpdate(email, userData, { new: true });
    if (!user) {
      throw new Error("Error While Updating User");
    }
    return user;
  } catch (error) {
    throw new Error("Error While Updating User: " + error.message);
  }
};

const sendOtpToEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const messageOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Notification from Reviva",
      html: `<section style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333; background-color: #f5f5f5;">
      <table style="width: 100%; max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 20px;">
            <div style="text-align: center;">
              <h3 style="font-weight: 600; color: #00b0e0; margin-top: 0;">REVIVA</h3>
            </div>
            <div style="margin-bottom: 10px;">
              <p style="font-size: 16px; margin: 0;">Your Password Change Verification Otp is: <span style="font-weight: bold; font-size: 24px; color: #333; text-align:center ">${otp}</span> It Will Expire In <strong style="color:"#FF0000">1 Hour</strong/></p>
            </div>
            <div style="text-align: center; margin-top: 50px; font-size: 12px;">
              <p>Powered by &copy; Reviva Ltd.</p>
            </div>
          </td>
        </tr>
      </table>
    </section>`,
    };

    transporter.sendMail(messageOption, async (error, info) => {
      if (!error) {
        // Hash the OTP
        const hashedOtp = await bcrypt.hash(otp, 10);
        const otpData = {
          email,
          otp: hashedOtp,
          createdAt: Date.now(),
          expiredAt: Date.now() + 3600000, // Adjust expiry time here
        };
        const newOtp = await createOtp(otpData);
        return newOtp;
      } else {
        throw new Error("Error Sending Otp Email: " + error.message);
      }
    });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw new Error("Error occurred while sending email: " + error.message);
  }
};

const verifyOtp = async (data) => {
  const { email, otp } = data;
  if (!email) {
    throw new Error("Email Must Be Provided");
  }
  if (!otp) {
    throw new Error("Otp Must Be Provided");
  }
  const userOtp = await findUserOtp({ email });
  // Compare hashed OTP
  try {
    const optMatched = await bcrypt.compare(otp, userOtp.otp);
    const otpExpiry = userOtp?.expiredAt > Date.now();
    if (!otpExpiry) {
      await deleteOtp({ email });
      throw new Error("Otp Has Been Expired");
    }
    return optMatched;
  } catch (error) {
    console.log(error);
    throw new Error("Error Matching Opt Error:", error.message);
  }
};

module.exports = {
  createUser,
  getUserByData,
  createOtp,
  findUserOtp,
  deleteOtp,
  updateUser,
  sendOtpToEmail,
  verifyOtp,
  updateUserProfilePicture,
};
