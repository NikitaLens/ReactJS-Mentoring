import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photo from './photo';
import user from './user';
import searchUser from './searchUser';
import currentUser from './currentUser';
import ownerUser from './ownerUser';
import ownerUserPhoto from './ownerUserPhoto';
import ownerUserPhotoInfo from './ownerUserPhotoInfo';
import photoStoreInfo from './photoStoreInfo';

export default combineReducers({
    router: routerReducer,
    currentUser,
    searchUser,
    ownerUser,
    ownerUserPhoto,
    ownerUserPhotoInfo,
    photo,
    photoStoreInfo: photoStoreInfo,
    user
})

