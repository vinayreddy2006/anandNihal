import  transporter  from "../config/nodemailer.js"; // adjust path

 const sendOtpEmail = async (email, otp,mailOptions) => {
 
  await transporter.sendMail(mailOptions);
};

export default sendOtpEmail;


