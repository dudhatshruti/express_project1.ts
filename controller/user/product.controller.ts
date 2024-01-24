import { Request, Response } from 'express';
import  ProductService from '../../service/product.service';
import productModel from '../../model/productModel';
const productService = new ProductService();

declare global {
    namespace Express {
        interface Request {
            user?: any;
            product?:any;
        }
    }
}

export const getProduct = async(req:Request,res:Response)=>{
    try {
        let product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.json({message:"product is not available"});
        }
        res.status(201).json(product);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


export const getALLProduct = async(req:Request,res:Response)=>{
    try {
        let product = await productModel.find();
        if (!product) {
            return res.json({message:"product is not available"});
        }
        res.status(201).json(product);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const productCategory=async (req:Request,res:Response)=>{
    let cat = req.params.categories;
    let product=await productModel.findOne({isDelete:false,categories:cat})
    if(!product)
    {
        return res.json({message:'not any product in this category'})
    }
    res.json(product)
}



export const addReview = async(req:Request,res:Response)=>{
    try {
        let {comment,rating} = req.body;
        let product :any= await productModel.findById(req.params.id);
        const alreadyReviewed = product.reviews.find((r:any)=>r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            return res.status(400).json({message:"user already reviewd"});
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review),
        product.numReviews = product?.reviews.length

        product.rating = product.reviews.reduce((total:any,item:any)=> item.rating + total,0) /  product.reviews.length
        await product?.save();
        res.status(201).json({message:"review added"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const getReview = async(req:Request,res:Response)=>{
    try {
        let product = await productModel.findById(req.params.id);
        const getReview = product?.reviews.find((r:any)=>r.user.toString() === req.user._id.toString());
            return res.status(400).json(getReview); 
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const getAllReview = async(req:Request,res:Response)=>{
    try {
        let product = await productModel.findById(req.params.id);
        const allReview = product?.reviews;
        return res.json({message:"all users review",allReview});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const updateReview = async(req:Request,res:Response)=>{
    try {
        let {rating,comment} = req.body;
        
        let product  = await productModel.findById(req.params.id);
        if (!product) {
            return res.json({message:"product is not available"});
        }
        let reviews = product.reviews;
        let getReview :any= product.reviews.find((r)=>r.user.toString() === req.user._id.toString());
        if (getReview === -1) {
            res.json({message:"review not found"});
        }
        getReview.rating  = Number(rating),
        getReview.comment = comment
        product.rating = reviews.reduce((total,item)=> item.rating + total,0) /  product.reviews.length
        await product.save();
        res.json({message:"updated",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const deleteReview = async(req:Request,res:Response)=>{
    try {
        let product  = await productModel.findById(req.params.id);
        if (!product) {
            return res.json({message:"product is not available"});
        }
        let reviews = product.reviews;
        let getReview :any = product.reviews.find((r)=>r.user.toString() === req.user._id.toString());
        if (getReview === -1) {
            res.json({message:"review not found"});
        }
        getReview = {$set:{isDelete:true}}
        product.rating = reviews.reduce((total,item)=> item.rating + total,0) /  product.reviews.length
        await product.save();
        res.json({message:"deleted",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


