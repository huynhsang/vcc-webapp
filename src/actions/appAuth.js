import { createAction } from 'redux-starter-kit';
import actionsNames from './actionNames';

const {
	IS_AUTHENTICATED,
	FAILED_AUTHENTICATION
} = actionsNames;

// Export Actions
export const isAuthenticated = createAction(IS_AUTHENTICATED);
export const failedAuthentication = createAction(FAILED_AUTHENTICATION);
