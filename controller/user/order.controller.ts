import { Request, Response } from 'express';
import productModel from '../../model/productModel';
import cartModel from '../../model/cartModel';
import orderService from '../../service/order.service';
import orderModel from '../../model/orderModel';
const orderservice = new orderService();

declare global {
    namespace Express {
        interface Request {
            item?: any;
            user?:any;
        }
    }
}


export const addOrder = async(req:Request,res:Response)=>{
    try {
        let {fullname,address,phoneNo,zipcode,country,city,district} = req.body;
        let cartItem = await cartModel.find({user:req.user._id,isDelete:false}).populate('cartItem');
        console.log(cartItem);
        // if (cartItem.items == null) {
        //    return res.json({message:"user have not any cart..."});
        // }
        if (!cartItem || cartItem.length === 0) {
            return res.json({ message: 'Cart is empty' });
          }
        let order = cartItem.map((item:any)=>({
            cartItem : item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }))
        console.log(order);
        let totalPrice  = order.reduce(((total,item)=>total+=(item.quantity * item.price)),0);
        console.log(totalPrice);

        let newOrder = await orderservice.orderCreate({
            user: (req as any).user._id,
           items:order,
           totalAmount : totalPrice,
           shippingAddress:{
            fullname,address,phoneNo,zipcode,country,city,district
           }
        })
        newOrder.save();
        await cartModel.updateMany({user:req.user._id},{isDelete:true});
        res.status(201).json({order:newOrder, message:'order placed'});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

export const updateOrder = async(req:Request, res:Response) => {
    let { fullname, address,phoneNo, zipcode, country, district, city } = req.body;
    try {
        let order:any = await orderModel.findOne({ user: (req as any).user._id,isDelete:false});
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.shippingAddress = {
            fullname: fullname,
            address: address,
            phoneNo:phoneNo,
            zipcode: zipcode,
            country: country,
            district: district,
            city: city
        };
    //    await order.save();
        res.status(200).json({ order, message: 'Shipping address updated successfully' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteOrder = async(req:Request, res:Response)=>{
    try {
        let id = req.params.id;
        let order = await orderModel.findById(id);
        order = await orderModel.findOneAndUpdate(
            {_id:id},
            {$set:{isDelete:true}},
            {new:true}
        )
        res.json({message:"deleted",order})
    } 
    catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Internal server error' });
     }
}