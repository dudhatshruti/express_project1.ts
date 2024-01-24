
import express from "express";
const cartRoute = express.Router();
import { getAllCart, getCart } from '../../controller/admin/admin_cart.controller';
import {adminVerify} from "../../helper/TokenVerify";


cartRoute.get('/get-cart/:id',adminVerify,getCart);
cartRoute.get('/get-all-cart',adminVerify,getAllCart);

export default cartRoute;