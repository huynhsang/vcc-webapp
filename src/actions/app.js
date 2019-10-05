import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

const {
	SET_IS_AUTHENTICATED,
	SET_TO_AUTHENTICATE,
	TOGGLE_MOBILE_ASIDE
} = actionsNames;

// Export Actions
export const setIsAuthenticatedFn = createAction(SET_IS_AUTHENTICATED);

export const setToAuthenticateFn = createAction(SET_TO_AUTHENTICATE);

export const setToLoginFn = () => dispatch => dispatch(setToAuthenticateFn('login'));
export const setToRegistreFn = () => dispatch => dispatch(setToAuthenticateFn('registre'));
export const setToFindPasswordFn = () => dispatch => dispatch(setToAuthenticateFn('find-password'));


export const toggleMobileAsideFn = createAction(TOGGLE_MOBILE_ASIDE);