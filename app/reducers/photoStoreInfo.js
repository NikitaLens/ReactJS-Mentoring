import { UPDATE_PHOTO, FETCHING, PUT_PHOTO } from '../actions/photoActions';

const defaultStore = { 
	photoPage: 1,
	hasNext: true,
	fetching: false
};

export default function photoStoreInfo(state = defaultStore, action) {
	switch (action.type) {
		case FETCHING:
			return {
				...state,
				fetching: true
			};
		case PUT_PHOTO:
			return {
				...state,
				fetching: false
			};
		case UPDATE_PHOTO:
			return action.update;
		default:
			return state;
	}
}


