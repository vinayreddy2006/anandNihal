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
   
 const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: email,
    subject: "Your OTP Code",
    text: `Your Login OTP for AnandUtsav is ${otp}. This Otp expires in 2 mins `,
  };
  
  await sendOtpEmail(email, otp,mailOptions);

    return res.status(200).json({ success: true, msg: "OTP sent to email. Please verify." });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export default register;
