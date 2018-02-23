import initialState from '../mockup/photos';

export default function photo( state = initialState, action ) {    
	// console.log(action);
	// console.log(state);
	if (action.type === 'ADD_COMMENT') {
		state.forEach( function(item) {
			if (item.id === action.comment.id_photo) {
				item.comment.push(action.comment.new_comment);
			}
		});
        return [
            ...state
        ]
	} else if (action.type === 'PUT_LIKE') {
		state.forEach( function(item) {
			if (item.id === action.like.id_photo) {
				let idDel = item.likes.indexOf(action.like.id_user);
				if ( idDel != -1 ) {
					item.likes.splice(idDel, 1);
				} else {
					item.likes.push(action.like.id_user);
				}
			}
		});
        return [
            ...state
        ]
	}
    return state;
}
