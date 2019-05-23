// Import Actions
import {FAILED_AUTHENTICATION, IS_AUTHENTICATED} from './../action/App';

const AppAuth = (state = {}, action) => {
	switch (action.type) {
		case IS_AUTHENTICATED:
			return {isAuthenticated: true};
		case FAILED_AUTHENTICATION:
			return {isAuthenticated: false};
		default:
			return state
	}
};

// Export Reducer
export default AppAuth;
