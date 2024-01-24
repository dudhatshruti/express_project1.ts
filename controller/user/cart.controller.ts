import { Request, Response } from 'express';
import productModel from '../../model/productModel';
import cartModel from '../../model/cartModel';
import CartService from '../../service/cart.service';
const cartService = new CartService();

export const addCart = async(req:Request,res:Response)=>{
    try {
        let {cartItem} = req.body;
        let product = await productModel.findById(cartItem);
        if (!product) {
           return res.json({message:"product is not found..."});
        }
        let cart = await cartService.cartFindOne({cartItem:req.body.cartItem,user:req.user._id});
        if (cart) {
            return res.json({message:"cart is already exist..."});
        }
        cart = await cartService.CartCreate({
            ...req.body,
            user:req.user._id,
        })
        res.status(201).json({message:"cart is added",cart});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}

export const updateCart = async (req:Request,res:Response) => {
    try {
      let id = req.params.id;
      let cart = await cartService.cartFindOne({ _id: id, user: req.user._id ,isDelete:false});
      if (!cart) {
        return res.json({ message: "cart is not available for this User" });
      }
      cart = await cartModel.findByIdAndUpdate(
        {_id:id},
        {...req.body}
    )
      res.status(201).json({ message: "update cart success" ,cart});
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server Error" });
    }
};


export const deleteCart = async(req:Request,res:Response)=>{
    try {
        let id = await req.params.id;
        let cart = await cartService.cartFindOne({_id:id,user:req.user._id,isDelete:false});
        console.log(id);
        if (!cart) {
            return res.json({message:'user has does not any cart...'});
        }
        cart = await cartModel.findByIdAndUpdate(
            {_id:id},
            {$set:{isDelete:true}}
        )
        res.json({message:'cart is deleted',cart});    
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."});
    }
}


export const getCart = async(req:Request,res:Response)=>{
    try {
    let id = await req.params.id;
       let cart = await cartService.cartFindOne({_id:id,user:req.user._id});
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
