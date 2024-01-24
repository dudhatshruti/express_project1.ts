import mongoose from "mongoose";

    const cartSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        cartItem:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        quantity:{
            type:Number,
            default:1,
            required:true
        },
        isDelete:{
            type:Boolean,
            default:false
        }
    })

const cartModel = mongoose.model('carts',cartSchema);
export default cartModel;