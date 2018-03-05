import { ADD_COMMENT, TOOGLE_LIKE, PUT_PHOTO } from '../actions/photoActions';

const initialState = [];

export default function photo(state = initialState, action) {
	switch (action.type) {
		case PUT_PHOTO: {			
			return action.photos;
		}
		case TOOGLE_LIKE: {
			const new_state = JSON.parse(JSON.stringify(state)).map(function(photo) {
				if (photo.id === action.like.id_photo) {
					const idDel = photo.likes.indexOf(action.like.id_user);
					if (idDel !== -1) {
						photo.likes.splice(idDel, 1);
					} else {
						photo.likes.push(action.like.id_user);
					}
				}
				return photo;
			});
			return new_state;
		}
		case ADD_COMMENT: {
			const new_state = JSON.parse(JSON.stringify(state)).map(function(photo) {
				if (photo.id === action.comment.photo_id) {
					photo.comments.push(action.comment);
				}
				return photo;
			});
			return new_state;
		}
		default: {
			return state;
		}
	}
}
