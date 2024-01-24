import userModel from '../model/userModel'
import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const userverify = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let secretKey: any = process.env.SECRET_KEY 
    let token :any= req.headers["authorization"]?.split(" ")[1];
    let {userId} : any = jwt.verify(token,secretKey);
    req.user = await userModel.findById(userId);
    if (req.user) {
        next();
    }
    else
    {
        res.json({message:'user invalid'});
    }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"invalid token..."});
    }
   
}


export const adminVerify = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    let secretKey: any = process.env.SECRET_KEY 
    let token :any = req.headers["authorization"]?.split(" ")[1];
    let {userId}:any = jwt.verify(token,secretKey);
    const user = await userModel.findById(userId);
    if (user && user.role === 'admin') {
        req.user = user;
        next();
    } 
    else
    {
        res.json({message:' only admin access this process,plz enter valid token'});
    }
    }
   catch (error) {
    console.log(error);
    res.status(500).json({message:"invalid token..."});
    }
}   

export const userTokenVerify = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    let secretKey: any = process.env.SECRET_KEY 
    let token:any = req.headers["authorization"]?.split(" ")[1];
    let {userId} :any = jwt.verify(token,secretKey);
    const user = await userModel.findById(userId);
    if (user && user.role === 'user') {
        req.user = user;
        next();
    } 
    else
    {
        res.json({message:'admin does not access this process'});
    }
    }
   catch (error) {
    console.log(error);
    res.status(500).json({message:"invalid token..."});
    }
}   