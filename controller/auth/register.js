import userModel from "../../model/userModel.js";
import sendOtpEmail from "../../utils/sendOtp.js";

const register = async (req, res) => {
  try {
    const { username, fullName, phone, email, location, gender } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ success: false, msg: "Required fields missing" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user = new userModel({
      username,
      fullName,
      phone,
      email,
      location,
      gender,
      Otp: otp,   // ✅ save OTP in DB
      OtpExpireAt: Date.now() + 2 * 60 * 1000,
    });

    await user.save();

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.status(200).json({ success: true, msg: "OTP sent to email. Please verify." });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export default register;
