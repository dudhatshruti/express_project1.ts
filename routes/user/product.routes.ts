import express from "express";
const productRoute = express.Router();
import { addReview, deleteReview, getALLProduct, getAllReview, getProduct, getReview, productCategory, updateReview } from "../../controller/user/product.controller";
import {userTokenVerify, userverify}  from '../../helper/TokenVerify'


productRoute.get('/get-product/:id',userverify,getProduct);
productRoute.get('/get-all-product',userverify,getALLProduct);
productRoute.get('/get-categories/:categories',userverify,productCategory);

productRoute.post('/add-review/:id',userTokenVerify,userverify,addReview);
productRoute.put('/update-review/:id',userTokenVerify,userverify,updateReview);
productRoute.delete('/delete-review',userTokenVerify,userverify,deleteReview);
productRoute.get('/get-review/:id',userTokenVerify,userverify,getReview);
productRoute.get('/get-all-review/:id',userTokenVerify,userverify,getAllReview);



export default productRoute;