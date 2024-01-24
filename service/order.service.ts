import orderModel from '../model/orderModel'

export default class orderService {
    orderCreate = async(body:any) =>{
        return await orderModel.create(body);
    }

    // get specific user
    orderFindOne = async(body:any)=>{
        return await orderModel.findOne(body);
    }
    
    updateOrder = async ( id:string, body:any) =>{
        return await orderModel.findByIdAndUpdate( id,{$set: body},{new:true});
    }
}
