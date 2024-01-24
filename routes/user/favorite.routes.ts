
import express from "express";
const favRoute = express.Router();
import {userverify} from "../../helper/TokenVerify";
import {userTokenVerify} from "../../helper/TokenVerify";
import { addFavorite, deleteFavorite } from "../../controller/user/favorite.controller";



favRoute.post('/add-fav',userTokenVerify,userverify,addFavorite)
favRoute.delete('/delete-fav/:id',userTokenVerify,userverify,deleteFavorite)


export default favRoute;