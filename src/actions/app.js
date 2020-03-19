import { createAction } from 'redux-starter-kit';
import i18n from 'i18next';
import actionsNames from '../constants/action-names.constant';

import {
    fetchUserFromCookie,
    updateUser,
    getUserByLoginToken
} from '../services/user.service';

import { errorAlertFn, successAlertFn } from './alertConfirm';
import { getUserProfileFn } from './userInfos';

const {
    SET_IS_AUTHENTICATED,
    SET_TO_AUTHENTICATE,
    TOGGLE_MOBILE_ASIDE,
    TOGGLE_CONTACT_US,
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILURE,
    UPDATE_CURRENT_USER_REQUEST,
    UPDATE_CURRENT_USER_SUCCESS,
    UPDATE_CURRENT_USER_FAILURE,
    SET_VERIFIED_USER,
    GET_USER_BY_LOGIN_TOKEN_SUCCESS
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

export const setVerifiedUser = createAction(SET_VERIFIED_USER);

export const fetchUserFromCookieFn = (isFirstRender = false) => {
    return dispatch => {
        dispatch(getCurrentUserRequest());
        fetchUserFromCookie()
            .then(data => {
                dispatch(getCurrentUserSuccess(data));
                if (isFirstRender) {
                    dispatch(setVerifiedUser(true));
                }
            })
            .catch(() => {
                dispatch(getCurrentUserFailure());
                if (isFirstRender) {
                    dispatch(setVerifiedUser(true));
                }
            });
    };
};

export const updateCurrentUserRequest = createAction(
    UPDATE_CURRENT_USER_REQUEST
);
export const updateCurrentUserSuccess = createAction(
    UPDATE_CURRENT_USER_SUCCESS
);
export const updateCurrentUserFailure = createAction(
    UPDATE_CURRENT_USER_FAILURE
);

export const updateCurrentUserFn = payload => {
    return dispatch => {
        dispatch(updateCurrentUserRequest());
        updateUser(payload)
            .then(data => {
                dispatch(updateCurrentUserSuccess(data));
                dispatch(
                    successAlertFn(i18n.t('my_profile_user_info_updated'))
                );
                dispatch(getUserProfileFn(data.id));
            })
            .catch(err => {
                dispatch(updateCurrentUserFailure());
                dispatch(errorAlertFn(err.response.data.error.message));
            });
    };
};

export const getUserByLoginTokenSuccess = createAction(
    GET_USER_BY_LOGIN_TOKEN_SUCCESS
);

export const getUserByLoginTokenFn = token => {
    return dispatch => {
        getUserByLoginToken(token)
            .then(data => {
                dispatch(getUserByLoginTokenSuccess(data));
            })
            .catch(err => console.log(err));
    };
};
