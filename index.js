import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'

import router from "./routes/authRoutes.js"




import connectDB from './config/connect.js';
import pRouter from './routes/authProviderRoutes.js';

const PORT=process.env.PORT|| 4000;

connectDB();



const app=express();

const allowedOrigins = [
    'http://localhost:5173',               // local React dev
    'https://anand-utsav.vercel.app'     // production frontend
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/auth',router);
app.use('/provider/auth',pRouter);


app.listen(PORT,()=>{
    console.log("Server Started at PORT" ,PORT);
})
