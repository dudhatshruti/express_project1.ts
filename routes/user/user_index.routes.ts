import express  from 'express';
const user = express.Router();

import userRoute from './user.routes'
import productRoute from './product.routes';
import cartRoute from './cart.routes';
import favRoute from './favorite.routes';
import orderRoute from './order.routes';


user.use('/user',userRoute);
user.use('/product',productRoute);
user.use('/cart',cartRoute);
user.use('/fav',favRoute);
user.use('/order',orderRoute);






export default user;