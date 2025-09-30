import express from "express";


import {enteremail,verifyOtp} from '../controller/auth/login.js'
import register from '../controller/auth/register.js'
import logout from '../controller/auth/logout.js'



const router=express.Router();

router.post('/register/enterdetails',register);
router.post('/register/verifyotp',verifyOtp);

router.post('/login/enteremail',enteremail);
router.post('/login/verifyotp',verifyOtp);

router.post('/logout',logout);


export default router;