import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import photo from './photo';
import user from './user';

export default combineReducers({
    router: routerReducer,
    user,
    currentUser: (() => { return 'nikitalens' }),
    photo
})

