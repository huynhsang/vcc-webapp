import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

const {
	IS_AUTHENTICATED,
	FAILED_AUTHENTICATION
} = actionsNames;

// Export Actions
export const isAuthenticatedFn = createAction(IS_AUTHENTICATED);
export const failedAuthenticationFn = createAction(FAILED_AUTHENTICATION);
