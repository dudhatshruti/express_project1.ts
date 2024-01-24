
import express from "express";
const adminRoute = express.Router();
import { getAllUser, getUser } from '../../controller/admin/admin.controller';
import {adminVerify} from "../../helper/TokenVerify";



adminRoute.get('/get-user/:id',adminVerify,getUser);
adminRoute.get('/get-all-user',adminVerify,getAllUser);

export default adminRoute