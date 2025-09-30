import  transporter  from "../config/nodemailer.js"; // adjust path

 const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: email,
    subject: "Your OTP Code",
    text: `Your Login OTP for AnandUtsav is ${otp}. This Otp expires in 2 mins `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtpEmail;


