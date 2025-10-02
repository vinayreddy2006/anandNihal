import ServiceProvider from "../../model/serviceProviderModel.js"
import bcrypt from "bcryptjs";


export const resetUserPassword=async(req,res)=>{
    const {email,otp,newpassword}=req.body;
    if(!email||!otp||!newpassword){
        return res.json({success:false,msg:"Missing Details"});
    }
    try{
        const user=await ServiceProvider.findOne({email});

   if(!user ) {
    return res.json({success:false,msg:"User not found"});
   }

   if(user.verifyOtp===' ' || user.verifyOtp!==otp) {
    return res.json({success:false,msg:"Invalid OTP"});
   }

   if(user.verifyOtpExpireAt<Date.now()) {
    return res.json({success:false,msg:"OTP expired"});
   }
   
   const hashedPassword=await bcrypt.hash(newpassword,10);

   user.password=hashedPassword;
  user.verifyOtp='';
  user.verifyOtpExpireAt=0;

await user.save();

return res.json({success:true,msg:"Password Changed"});
    }
    catch(err){
        return res.json({success:false,msg:err.message});
    }
}


export default resetUserPassword;