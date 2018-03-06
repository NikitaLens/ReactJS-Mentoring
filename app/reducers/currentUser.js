import { LOG_IN, SIGN_IN, TOOGLE_FOLLOW } from "../actions/userActions";

export default function currentUser(state = null, action) {
	switch (action.type) {
		case LOG_IN: {
			return action.user;
		}
		case SIGN_IN: {
			return action.user;
		}
		case TOOGLE_FOLLOW: {
			if (state.id === action.follow.id_user) {
				const idFoller = state.following.indexOf(action.follow.id_follow);
				if (idFoller !== -1) {
					state.following.splice(idFoller, 1);
				} else {
					state.following.push(action.follow.id_follow);
				}
			}
			return state
		}
		default: {
			return state;
		}
	}
}
