import express from "express";
import protectProvider  from "../middlewares/providerAuth.js";
import {addService,getServices} from "../controller/service.js";
import getAllServices from "../controller/serviceProvider.js";


const aRouter=express.Router();




aRouter.post('/addService',protectProvider,addService);
aRouter.get('/getallServicesByProvider',protectProvider,getAllServices);
aRouter.get('/allservices',getServices);



export default aRouter;