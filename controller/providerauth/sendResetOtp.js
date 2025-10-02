import ServiceProvider from "../../model/serviceProviderModel.js"
import sendOtpEmail from "../../utils/sendOtp.js";

export const sendResetOtp=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.json({success:false,msg:"Missing Details"});
    }
    try{
    const user=await ServiceProvider.findOne({email});


if(!user) {
    return res.json({success:false,msg:"User not found"});
}

const otp= String(Math.floor(100000+ Math.random()*900000)); 
   

      user.verifyOtp=otp;
      user.verifyOtpExpireAt=Date.now()+5*60*1000;

      await user.save();

      const mailOptions={
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:'Password Reset Otp',
        text:`Your OTP is ${otp}. Reset your password using this OTP`,
    }

    await sendOtpEmail(email, otp,mailOptions);

    return res.json({success:true,msg:"OTP sent"});

    }
    catch(err) {
        return res.json({success:false,msg:err.message});
    }
}

export default sendResetOtp;