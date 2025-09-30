const logout=async(req,res)=>{
   try{
       res.clearCookie('token',{
         httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite: process.env.NODE_ENV==='production'?'none':'strict',
       });
       return res.json({success:true,msg:"Logged Out"});
   }
   catch(err){
            res.json({success:false,msg:err.message});
   }
}

export default logout;