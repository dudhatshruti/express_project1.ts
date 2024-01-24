import { Request, Response } from 'express';
import ProductService from '../../service/product.service';
import productModel from '../../model/productModel';
const productService = new ProductService();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
            product?:any
            user?:any
        }
    }
}

export const addNewProducts = async(req:Request,res:Response)=>{
    try {
       
        let product = await productService.productFindOne({title:req.body.title});
        if (product) {
            return res.json({message:"product is already available..."});
        }
        let productpath :any;
        if(req.file){
            productpath = `${req.file.path}`
        }
        product = await productService.productCreate({
            ...req.body,
            productImage: productpath
        });
        res.json({message:'product is added.',product})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const updateProduct = async(req:Request,res:Response)=>{
    try {
        let id = req.params.id;
        let product =await productService.getProductById(id);
        if (!product) {
           return res.json({message:"product is not available"});
        }
        product = await productModel.findByIdAndUpdate(
            { _id : id},
            {$set:{...req.body}},
            {new:true}
        ) 
        res.status(201).json({message:"product is updated...",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const deleteProduct = async(req:Request,res:Response)=>{
    try {
        let product = await productService.getProductById(req.params.id);
        if (!product) {
           return res.json({message:"product is not available..."});
        }
        product = await productModel.findByIdAndUpdate(
            product._id,
            {$set:{isDelete:true}},
            {new:true}
        )
        res.status(201).json({message:"product is deleted...",product});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
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


export const getAllReview = async(req:Request,res:Response)=>{
    try {
        let product :any= await productModel.findById(req.params.id);
        const allReview = product.reviews;
        return res.json({message:"all users review",allReview});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const getReview = async(req:Request,res:Response)=>{
    try {
        let product = await productModel.findOne({isDelete:false});
        const getReview = product?.reviews.find((r:any)=>r.user.toString() === req.user._id.toString());
            return res.status(400).json(getReview); 
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}