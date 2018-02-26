import initialState from '../mockup/photos';
import { ADD_COMMENT, PUT_LIKE } from '../actions/photoActions';

// const addComment = (state, action) => {
//     state.forEach( function(item) {
// 		if (item.id === action.comment.id_photo) {
// 			item.comment.push(action.comment.new_comment);
// 		}
// 	});
// 	return [...state]
// };

// const putLike = (state, action) => {
//     state.forEach( function(item) {
// 		if (item.id === action.like.id_photo) {
// 			let idDel = item.likes.indexOf(action.like.id_user);
// 			if ( idDel != -1 ) {
// 				item.likes.splice(idDel, 1);
// 			} else {
// 				item.likes.push(action.like.id_user);
// 			}
// 		}
// 	});
// 	return [...state]
// };

export default function photo( state = initialState, action ) {    
	// console.log(action);
	// console.log(state);
	switch (action.type) {
		case ADD_COMMENT: {
			state.forEach( function(item) {
				if (item.id === action.comment.id_photo) {
					item.comment.push(action.comment.new_comment);
				}
			});
			return [...state];
		}
		case PUT_LIKE: {
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
			return [...state]
		}
		default: {
			return state;
		}
	}
}
