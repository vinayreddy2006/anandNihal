import express from "express";
import protectProvider  from "../middlewares/providerAuth.js";
import addService from "../controller/service.js";


const aRouter=express.Router();




aRouter.post('/addService',protectProvider,addService);





export default aRouter;