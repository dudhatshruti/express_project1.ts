import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profileImage:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    isDelete:{
        type:Boolean,
        default:false,

    }
})
const userModel = mongoose.model('users',userSchema);
export default userModel;