import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'

import router from "./routes/authRoutes.js"



import cookieParser from "cookie-parser";

import connectDB from './config/connect.js';
import pRouter from './routes/authProviderRoutes.js';
import aRouter from './routes/addServiceProvider.js';
import cRouter from './routes/categoryRoutes.js';

const PORT=process.env.PORT|| 4000;

connectDB();



const app=express();

const allowedOrigins = [
    'http://localhost:5173',               // local React dev
    'https://anand-utsav.vercel.app'     // production frontend
];

// app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use('/auth',router);
app.use('/provider/auth',pRouter);
app.use("/provider",aRouter);
app.use("/category",cRouter);




app.listen(PORT,()=>{
    console.log("Server Started at PORT" ,PORT);
})
