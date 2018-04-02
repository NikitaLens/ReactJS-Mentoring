import { LOG_IN, SIGN_IN, TOOGLE_FOLLOW } from "../actions/userActions";
import cloneDeep from "lodash/cloneDeep";

export default function user(state = [], action) {
	switch (action.type) {
		case TOOGLE_FOLLOW: {
			const new_state = cloneDeep(state).map(function (user) {
				if (user.id === action.follow.id_user) {
					// console.log('Успех нашли того кто подписывается', user.id);
					const idFoller = user.following.indexOf(action.follow.id_follow);
					if (idFoller !== -1) {
						user.following.splice(idFoller, 1);
					} else {
						user.following.push(action.follow.id_follow);
					}
				}

				if (user.id === action.follow.id_follow) {
					// console.log('Успех нашли того на кого подписываются', user.id);
					const idFolling = user.followers.indexOf(action.follow.id_user);
					if (idFolling !== -1) {
						user.followers.splice(idFolling, 1);
					} else {
						user.followers.push(action.follow.id_user);
					}
				}
				return user;
			});
			return new_state
		}
		default: {
			return state;
		}
	}
}
