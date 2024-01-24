import mongoose from 'mongoose';

export class DB {
    public static connectToDB(DBUrl:string):Promise<string>
    {
        return new Promise((resolve,reject)=>{
            mongoose.connect(DBUrl)
            .then(()=>{
                resolve('database connected');
            })
            .catch((error)=>{
                if(error)
                console.log(error);
                reject('MongoDB not connected...!')
            })
        })
    }
}