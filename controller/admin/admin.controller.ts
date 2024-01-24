import { Request, Response } from 'express';
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

export const getUser = async(req:Request,res:Response)=>{
    try {
        let user = await userService.getUserById(req.params.id);
        if (!user) {
            res.json({message:"user is not exist..."});
        }
        res.status(201).json(user);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

export const getAllUser = async(req:Request,res:Response)=>{
    try {
        let user = await userModel.find();
        res.status(201).json(user);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}