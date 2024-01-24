import cartModel from "../model/cartModel";

export default class CartService{
    CartCreate = async(body:any) =>{
        return await cartModel.create(body);
    }

    // get specific user
    cartFindOne = async(body:any)=>{
        return await cartModel.findOne(body);
    }

    // get specific user by id
    getCartById = async (id:string) =>{
        return await cartModel.findById(id);
    }

    // get all user
    getAllCart = async (query:any) =>{
        return await cartModel.find(query);
    }

    //  update user
    updateCartById = async ( id:string, body:any) =>{
        return await cartModel.findByIdAndUpdate( id,{$set: body},{new:true});
    }

    // delete user
    deleteCartById = async ( id:string) =>{
        return await cartModel.findByIdAndUpdate( id,{$set:{isDelete:true}},{new:true});
    }
}