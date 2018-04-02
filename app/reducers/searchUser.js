import { GET_USERS_SEARCH } from "../actions/userActions";

export default function searchUser(state = [], action) {
	switch (action.type) {
		case GET_USERS_SEARCH: {
			return action.users
		}		
		default: {
			return state;
		}
	}
}
