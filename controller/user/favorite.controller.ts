import { Request, Response } from 'express';
import productModel from '../../model/productModel'

import FavoriteService from '../../service/favorite.service';
import favoriteModel from '../../model/favoriteModel';
const favoriteservice = new FavoriteService();

export const addFavorite = async(req:Request,res:Response)=>{
    try {
        let {product_item} = req.body;
        let product = await productModel.findById(product_item)
        if (!product) {
           return res.json({message:"product is not in favorite list..."});
        }
        let favorite = await favoriteservice.favFindOne({product_item:req.body.product_item,user:req.user._id});
        if (favorite) {
            return res.json({message:"items is already exist in list..."});
        }
        favorite = await favoriteservice.favCreate({
            ...req.body,
            user:req.user._id,
        });
        favorite.save();
        res.status(201).json({message:"item is added in favorite list",favorite});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


export const deleteFavorite = async(req:Request,res:Response)=>{
    try {
        let id = req.params.id;
        let favorite = await favoriteservice.favFindOne({_id:id,user:req.user._id,isDelete:false});
        if (!favorite) {
            return res.json({message:'user has does not in favorite list...'});    
        }
        favorite = await favoriteModel.findOneAndUpdate(
            {_id:id},
            {$set:{isDelete:true}},
            {new:true}
        )
        res.json({message:'product item is deleted in favorite list',favorite});    

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}
