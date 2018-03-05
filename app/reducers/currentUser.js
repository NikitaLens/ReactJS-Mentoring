import { LOG_IN, SIGN_IN } from "../actions/userActions";

const initialState = null;

export default function currentUser(state = initialState, action) {    
    switch (action.type) {
		case LOG_IN: {		
			return action.user;
		}
		case SIGN_IN: {
            return action.user;
		}
		default: {
			return state;
		}
	}
}
