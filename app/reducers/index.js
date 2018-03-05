import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photo from './photo';
import user from './user';
import currentUser from './currentUser';

export default combineReducers({
    router: routerReducer,
    currentUser: currentUser,
    user,
    photo
})

