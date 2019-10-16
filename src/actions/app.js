import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { fetchUserFromCookie } from '../services/user.service';

const {
    SET_IS_AUTHENTICATED,
    SET_TO_AUTHENTICATE,
    TOGGLE_MOBILE_ASIDE,
	TOGGLE_CONTACT_US,
	GET_CURRENT_USER_REQUEST,
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_FAILURE
} = actionsNames;

// Export Actions
export const setIsAuthenticatedFn = createAction(SET_IS_AUTHENTICATED);

export const setToAuthenticateFn = createAction(SET_TO_AUTHENTICATE);

export const setToLoginFn = () => dispatch =>
    dispatch(setToAuthenticateFn('login'));
export const setToRegistreFn = () => dispatch =>
    dispatch(setToAuthenticateFn('registre'));
export const setToFindPasswordFn = () => dispatch =>
    dispatch(setToAuthenticateFn('find-password'));

export const toggleMobileAsideFn = createAction(TOGGLE_MOBILE_ASIDE);

export const toggleContactUsFn = createAction(TOGGLE_CONTACT_US);

export const getCurrentUserRequest = createAction(GET_CURRENT_USER_REQUEST);
export const getCurrentUserSuccess = createAction(GET_CURRENT_USER_SUCCESS);
export const getCurrentUserFailure = createAction(GET_CURRENT_USER_FAILURE);

export const fetchUserFromCookieFn = () => {
    return dispatch => {
        dispatch(getCurrentUserRequest());
        fetchUserFromCookie()
            .then((data) => {
				dispatch(getCurrentUserSuccess(data))
			})
            .catch(() => {
				dispatch(getCurrentUserFailure())
			});
    };
};

