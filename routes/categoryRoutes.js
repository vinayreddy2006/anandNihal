import express from "express";
import { getAllCategories,getServicesByCategory } from "../controller/category.js";

const cRouter=express.Router();



cRouter.get('/getall',getAllCategories);
cRouter.get("/services/:slug",getServicesByCategory)




export default cRouter;