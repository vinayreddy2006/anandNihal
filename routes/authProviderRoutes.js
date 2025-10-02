
import express from "express";

import register from "../controller/providerauth/register.js";
import login from "../controller/providerauth/login.js";
import logout from "../controller/providerauth/logout.js";
import sendResetOtp from "../controller/providerauth/sendResetOtp.js"
import resetUserPassword from "../controller/providerauth/resetPassword.js"





const pRouter=express.Router();



pRouter.post('/register',register);
pRouter.post('/login',login);
pRouter.post('/logout',logout);
//path middleware handlerfunction
pRouter.post('/forgototp',sendResetOtp);
pRouter.post('/verifyOtp',resetUserPassword);








export default pRouter;