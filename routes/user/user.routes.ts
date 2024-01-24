import express from "express";
const userRoute = express.Router();
import {deleteUser, login, resetPassword, signup, updateUser} from '../../controller/user/user.controller'
import {userverify} from "../../helper/TokenVerify";
import upload from "../../helper/image";


userRoute.post('/signup',upload.single('Image'),signup);
userRoute.post('/login',login);
userRoute.put('/update-user',userverify,updateUser);
userRoute.delete('/delete-user',userverify,deleteUser);
userRoute.put('/reset-password',userverify,resetPassword);

export default userRoute