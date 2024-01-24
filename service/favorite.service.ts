import favoriteModel from '../model/favoriteModel'

export default class FavoriteService {
    favCreate = async(body:any) =>{
        return await favoriteModel.create(body);
    }

    // get specific user
    favFindOne = async(body:any)=>{
        return await favoriteModel.findOne(body);
    }
    
}
