import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';
import userModel from '../../model/userModel';
import Userservice from '../../service/user.service';
const userService = new Userservice();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const signup = async(req:Request,res:Response)=>{
    try {
        let user = await userService.getUser({email:req.body.email,isDelete:false});
        if (user) {
            return res.json({message:"user is already exists..."});
        }
        let hashpassword = await bcrypt.hash(req.body.password,10);
        let filepath: any;
        if(req.file){
            filepath = `${req.file.path}`;
        }
        user = await userService.addNewUser({
            ...req.body,
            password:hashpassword,
            profileImage:filepath,
        })
        user.save();
        res.status(201).json({message:"user is added",user});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

export const login = async(req:Request,res:Response)=>{
    try {
        let user =await userService.getUser({email:req.body.email});
        if (!user) {
            return res.json({message:"user is not found..."});
        }
        let checkPassword = await bcrypt.compare(req.body.password,user.password);
        if (!checkPassword) {
            return res.json({message:"password is not match..."});
        }
        let payload = {
            userId : user._id
        }
        let secret:any = process.env.SECRET_KEY;
        let token = jwt.sign(payload,secret);
        res.status(200).json({token,message:'login sucess'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

export const updateUser = async(req:Request,res:Response)=>{
    try {

        let filepath: any;
        if(req.file){
            filepath = `${req.file.path}`
        }
       let user = await userService.updateUser(
           req.user._id,
          { ...req.body, profileImage: filepath,}
        )
        res.status(201).json({message:"user is updated",user});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

export const deleteUser = async(req:Request,res:Response)=>{
    try {
       let user = await userService.updateUser(
        req.user._id,
        {isDelete:true}
        )
        res.status(201).json({message:"user is deleted...",user});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const resetPassword = async(req:Request,res:Response)=>{
    try {
        let {curr_password,new_password,confirm_password} = req.body;
        let checkPassword = await bcrypt.compare(curr_password,req.user.password);
        if (!checkPassword) {
            res.json({message:"password is incorrect..."});
        }
        if (new_password != confirm_password) {
            res.json({message:"not confirm password..."})
        }
        let hashPassword = await bcrypt.hash(new_password,10);
        new_password = await userModel.findByIdAndUpdate(
            req.user._id,
            {$set:{password:hashPassword}}
        )
        res.json({message:"password is changed",new_password});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

