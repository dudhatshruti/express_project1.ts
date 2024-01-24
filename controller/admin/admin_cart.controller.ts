import { Request, Response } from 'express';
import cartModel from '../../model/cartModel';
import CartService from '../../service/cart.service';
const cartService = new CartService();

export const getCart = async(req:Request,res:Response)=>{
    try {
    let id =await req.params.id;
       let cart = await cartService.cartFindOne({_id:id});
       if (!cart) {
           return  res.json({message:"user has does not any cart..."})
       }
       res.status(201).json(cart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

export const getAllCart = async(req:Request,res:Response)=>{
    try {
        let cart = await cartModel.find({isDelete:false});
        if (!cart) {
           return res.json({message:"cart is not found..."});
        }
        res.status(201).json(cart);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}