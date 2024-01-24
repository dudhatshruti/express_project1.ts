import productModel from '../model/productModel'


export default class productService{
    productCreate = async(body:any) =>{
        return await productModel.create(body);
    }

    // get specific product
    productFindOne = async(body:any)=>{
        return await productModel.findOne(body);
    }

    // get specific product by id
    getProductById = async (id:string) =>{
        return await productModel.findById(id);
    }

    // get all product
    AllProduct = async (query:any) =>{
        return await productModel.find(query);

    }

    //  update product
    updateProduct = async ( id:string, body:any) =>{
        return await productModel.findByIdAndUpdate( id,{$set: body},{new:true});
    }

    // delete user
    deleteProduct = async ( id:string ) =>{
        return await productModel.findByIdAndUpdate( id,{$set:{isDelete:true}},{new:true});
    }
    
}
