const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { createOtp, findUserOtp } = require("../services/userService");
const bcrypt = require("bcrypt");
const Otp = require("../models/otpModel");

const sendOtpEmail = asyncHandler(async (req, res) => {
  const { email } = req;
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
              <p style="font-size: 16px; margin: 0;">Your OTP is: <span style="font-weight: bold; font-size: 24px; color: #333; text-align:center ">${otp}</span> It Will Expire In 3 Minutes</p>
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
          expiredAt: Date.now() + 180000, // Adjust expiry time here
        };
        const newOtp = await createOtp(otpData);
        res.status(200).json({
          message: "Otp Sent Successfully",
          success: true,
          data: newOtp,
        });
      } else {
        console.log(error, "from nodemailer");
      }
    });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const verifyOtpAndUpdate = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const { email } = req;
  const userOtp = await findUserOtp({ email });

  // Compare hashed OTP
  const optMatched = await bcrypt.compare(otp, userOtp.otp);
  console.log(optMatched,"otp");
  if (optMatched) {
    const otpExpiry = userOtp?.expiredAt > Date.now();
    if (!otpExpiry) {
      // 
      res.status(401).json({ message: "Otp Has Been Expired", success: false });
    } else {
      // 
      res.status(200).json({ message: "Otp Verified", success: true });
    }
  }
});

module.exports = { sendOtpEmail, verifyOtpAndUpdate };
