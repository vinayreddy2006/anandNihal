import express from "express";

import protect from "../middlewares/userAuth.js";
import {addReview,deleteReview,getServiceReview,getUserReview} from "../controller/review.js";


const rRouter=express.Router();


rRouter.post('/givereview',protect,addReview);
rRouter.delete('/removereview/:reviewId',protect,deleteReview);
rRouter.get('/userReview',protect,getUserReview);
rRouter.get('/serviceReview/:serviceId',getServiceReview);
// rRouter.put('/editReview',protect,editReview);

export default rRouter;