import { Request, Response } from 'express';
import productModel from '../../model/productModel';
import cartModel from '../../model/cartModel';
import orderService from '../../service/order.service';
import orderModel from '../../model/orderModel';
const orderservice = new orderService();


declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const getOrder = async(req:Request,res:Response)=>{
    try {
        let id = req.params.id;
        let order = await orderModel.findById(id);
        if (!order) {
            return res.json({message:"user is not found..."});
        }
        res.json(order);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const getAllOrder = async(req:Request,res:Response)=>{
    try {
        let order = await orderModel.find();
        if (!order) {
            res.json({message:"no any order"});
        }
        res.json(order);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

// exports.updateStatus = async(req:Request,res:Response)=>{
//     try {
//         let {status} = req.body;
//         let id = await req.params.id;
//         let order = await orderModel.findById(id);
//         if (!order) {
//             res.json({message:"not found order"})
//         }
//         order.status = {
//             status:status
//         } 
//         res.status(201).json({message:"status updated",order});
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).json({message:"internal server error"});
//     }
// }