import { PUT_PHOTO_OWNER } from '../actions/photoActions';

export default function ownerUserPhoto(state = [], action) {
	switch (action.type) {
		case PUT_PHOTO_OWNER: {
			return action.photos
		}
		default: {
			return state;
		}
	}
}
