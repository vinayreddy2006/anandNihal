import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'

import router from "./routes/authRoutes.js"




import connectDB from './config/connect.js';
import pRouter from './routes/authProviderRoutes.js';

const PORT=process.env.PORT|| 4000;

connectDB();



const app=express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/auth',router);
app.use('/provider/auth',pRouter);


app.listen(PORT,()=>{
    console.log("Server Started at PORT" ,PORT);
})
