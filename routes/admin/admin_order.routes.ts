
import express from "express";
const orderRoute = express.Router();
import { getAllOrder, getOrder } from '../../controller/admin/admin_order.controller';
import {adminVerify} from "../../helper/TokenVerify";




orderRoute.get('/get-order/:id',adminVerify,getOrder);
orderRoute.get('/get-all-order',adminVerify,getAllOrder);


export default orderRoute