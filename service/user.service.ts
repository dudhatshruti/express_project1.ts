import { strict } from "assert";
import userModel from "../model/userModel";

export default class Userservice{
    getUser = async (body:any) => {
        return await userModel.findOne(body);
    }

    addNewUser = async (body:any) => {
        return await userModel.create(body);
    }

    updateUser =async (id: string,body:any) => {
        return await userModel.findByIdAndUpdate(id, {$set: body}, {new:true})
    }

    getUserById = async (id:string) =>{
        return await userModel.findById(id);
    }


    // getAllUser = async (query:string) =>{
    //     return await userModel.find(query);

    // }

    // delete user
    deleteUser = async ( id:string) =>{
        return await userModel.findByIdAndUpdate( id,{$set:{isDelete:true}},{new:true});
    }
}