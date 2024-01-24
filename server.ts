import express from 'express';
const server = express();
import dotenv from 'dotenv';
import morgan from 'morgan';
import { DB } from './database/db';

import admin from './routes/admin/admin_index.routes'
import user from './routes/user/user_index.routes';

dotenv.config({
    path:"./.env"
})

const port : Number | undefined = Number(process.env.PORT);
const DBUrl : string | undefined = (process.env.MONGO_DB_URL);

server.use(express.json());
server.use(morgan('dev'));

server.use('/api',admin);
server.use('/api',user);



if (port && DBUrl ) {
    server.listen(port,()=>{
        if (DBUrl) {
            DB.connectToDB(DBUrl).then((dbresponse)=>{
                console.log(dbresponse); 
            }).catch((error)=>{
                console.log(error);                
            });
            console.log(`Server start at http://localhost:${port}...`);
        }        
    }) 
}
