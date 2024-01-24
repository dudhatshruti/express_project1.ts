import mongoose from "mongoose";

    const favoriteSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        product_item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        isDelete:{
            type:Boolean,
            default:false
        }
    })

const favoriteModel = mongoose.model('favorites',favoriteSchema);
export default favoriteModel;