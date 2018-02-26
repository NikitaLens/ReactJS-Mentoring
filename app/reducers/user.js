import initialState from '../mockup/users';
import { LOG_IN, SIGN_IN } from "../actions/userActions";

export default function user( state = initialState, action ) {    
	// console.log(action);
    // console.log(state);
    switch (action.type) {
		case LOG_IN: {
			state.forEach( function(item) {
                if (item.nick === action.user.username) {
                    console.log('log in success');
                } else console.log('log in failed');
            });
            return [...state]
		}
		case SIGN_IN: {
            const new_user = {
                id: Date.now().toString(),
                nick: action.user.username,
                password: action.user.password,
                avatar: '',
                fullname: action.user.fullname,
                email: action.user.email,
                link: '',
                photos: [],
                followers: [],
                following: []
            }	
            return [
                ...state,
                new_user
            ]			
		}
		default: {
			return state;
		}
	}
}
