import express  from 'express';
const admin = express.Router();

import adminRoute from './admin.routes'
import productRoute from './admin_pro.routes'
import cartRoute from './admin_cart.routes';
import orderRoute from './admin_order.routes';


admin.use('/admin',adminRoute);
admin.use('/admin-product',productRoute);
admin.use('/admin-cart',cartRoute);
admin.use('/admin-order',orderRoute);




export default admin;