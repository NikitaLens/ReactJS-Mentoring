import initialState from '../mockup/users';

export default function user( state = initialState, action ) {    
	// console.log(action);
	// console.log(state);
	if (action.type === 'LOG_IN') {
		state.forEach( function(item) {
			if (item.nick === action.user.username) {
                console.log('log in success');
			} else console.log('log in failed');
		});
        return [
            ...state
        ]
	} else if (action.type === 'SIGN_UP') {
        let new_user = {
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
    return state;
}