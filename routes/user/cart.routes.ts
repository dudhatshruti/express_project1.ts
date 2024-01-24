
import express from "express";
const cartRoute = express.Router();
import {userverify} from "../../helper/TokenVerify";
import {userTokenVerify} from "../../helper/TokenVerify";
import { addCart, deleteCart, getAllCart, getCart, updateCart } from "../../controller/user/cart.controller";



cartRoute.post('/add-cart',userTokenVerify,userverify,addCart)
cartRoute.put('/update-cart/:id',userTokenVerify,userverify,updateCart);
cartRoute.delete('/delete-cart/:id',userTokenVerify,userverify,deleteCart)
cartRoute.get('/get-cart/:id',userTokenVerify,userverify,getCart);
cartRoute.get('/get-all-cart',userTokenVerify,userverify,getAllCart);

export default cartRoute;