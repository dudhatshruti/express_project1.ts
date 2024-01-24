import express from "express";
const orderRoute = express.Router();
import { addOrder, deleteOrder, updateOrder } from "../../controller/user/order.controller";
import {userverify,userTokenVerify}  from '../../helper/TokenVerify'


orderRoute.post('/add-order',userTokenVerify,userverify,addOrder);
orderRoute.put('/update-order',userTokenVerify,userverify,updateOrder);
orderRoute.delete('/delete-order/:id',userTokenVerify,userverify,deleteOrder);

export default orderRoute;

