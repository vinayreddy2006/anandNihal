import express from "express";
import { getUserDetails, getUserFavorites,removeFavorite,addFavorite,deleteUser, updateProfile } from "../controller/user.js";
import  protect  from "../middlewares/userAuth.js";

const uRouter=express.Router();


uRouter.get('/me',protect,getUserDetails); 
uRouter.delete('/deleteAccount',protect,deleteUser);

// Favorites
uRouter.get('/getFavorite',protect,getUserFavorites);
uRouter.post('/addFavorite',protect,addFavorite);
uRouter.delete('/removeFavorite',protect,removeFavorite);
uRouter.put('/updateUser',protect,updateProfile);



export default uRouter;