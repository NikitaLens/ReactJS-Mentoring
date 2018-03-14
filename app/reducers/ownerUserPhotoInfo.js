import { PUT_PHOTO_OWNER, UPDATE_PHOTO_OWNER, FETCHING_OWNER } from '../actions/photoActions';

const defaultStore = { 
	photoPage: 1,
	hasNext: true,
	fetching: false
};

export default function ownerUserPhotoInfo(state = defaultStore, action) {
	switch (action.type) {
		case FETCHING_OWNER:
			return {
				...state,
				fetching: true
			};
		case PUT_PHOTO_OWNER:
			return {
				...state,
				fetching: false
			};
		case UPDATE_PHOTO_OWNER:
			return action.update;
		default:
			return state;
	}
}


