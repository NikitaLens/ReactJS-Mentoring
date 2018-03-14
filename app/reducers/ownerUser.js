import { GET_USER } from "../actions/userActions";
import cloneDeep from "lodash/cloneDeep";

export default function ownerUser(state = {}, action) {
	switch (action.type) {
		case GET_USER: {
			return action.user
		}		
		default: {
			return state;
		}
	}
}
