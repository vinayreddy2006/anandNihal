import  transporter  from "../config/nodemailer.js"; // adjust path

 const sendWelcomeEmail = async (name,email) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: email,
    subject: "Welcome to AnandUtsav",
    text: `Hello ${name}.Welcome to Anand Utsav`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendWelcomeEmail;


