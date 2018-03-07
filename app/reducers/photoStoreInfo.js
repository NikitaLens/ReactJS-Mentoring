import { UPDATE_PHOTO } from '../actions/photoActions';

export default function photoStoreInfo(state = { photoPage: 1, hasNext: true }, action) {
	switch (action.type) {
		case UPDATE_PHOTO: {
			return action.update;
		}
		default: {
			return state;
		}
	}
}


