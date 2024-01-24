
import express from "express";
const productRoute = express.Router();
import { addNewProducts, deleteProduct, getALLProduct, getAllReview, getProduct, getReview, updateProduct } from '../../controller/admin/admin_pro.controller';
import {adminVerify} from "../../helper/TokenVerify";
import upload from "../../helper/image";




productRoute.post('/add-new-product',upload.array('productImage',2),adminVerify,addNewProducts);
productRoute.put('/update-product/:id',adminVerify,updateProduct);
productRoute.delete('/delete-product/:id',adminVerify,deleteProduct);
productRoute.get('/get-product/:id',adminVerify,getProduct);
productRoute.get('/get-all-product/:id',adminVerify,getALLProduct);

productRoute.get('/get-review/:id',adminVerify,getReview);
productRoute.get('/get-all-review',adminVerify,getAllReview);



export default productRoute