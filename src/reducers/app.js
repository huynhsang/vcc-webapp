// Import Actions

import { createReducer } from 'redux-starter-kit';
import {
    setIsAuthenticatedFn,
    setToAuthenticateFn,
    toggleMobileAsideFn,
    toggleContactUsFn,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    getCurrentUserFailure,
    updateCurrentUserRequest,
    updateCurrentUserSuccess,
    updateCurrentUserFailure
} from '../actions/app';

const defaultState = {
    isAuthenticated: false,
    toAuthenticate: '',
    isOpenMobileAside: false,
    isOpenContactUs: false,
    isGettingUser: false,
    currentUser: null,
    isUpdatingUser: false
};

const appReducer = createReducer(defaultState, {
    [setIsAuthenticatedFn]: (state, action) => {
        const { payload } = action;
        state.isAuthenticated = payload;
    },
    [setToAuthenticateFn]: (state, action) => {
        const { payload } = action;
        state.toAuthenticate = payload;
    },
    [toggleMobileAsideFn]: (state, action) => {
        const { payload } = action;
        state.isOpenMobileAside = payload;
    },
    [toggleContactUsFn]: (state, action) => {
        const { payload } = action;
        state.isOpenContactUs = payload;
    },
    [getCurrentUserRequest]: state => {
        state.isGettingUser = true;
    },
    [getCurrentUserSuccess]: (state, action) => {
        state.isGettingUser = false;
        const { payload } = action;
        state.currentUser = payload;
        state.isAuthenticated = true;
    },
    [getCurrentUserFailure]: (state, action) => {
        state.isGettingUser = false;
        state.isAuthenticated = false;
    },
    [updateCurrentUserRequest]: state => {
        state.isUpdatingUser = true;
    },
    [updateCurrentUserSuccess]: (state, action) => {
        state.isUpdatingUser = false;
        const { payload } = action;
        state.currentUser = payload;
    },
    [updateCurrentUserFailure]: state => {
        state.isUpdatingUser = false;
    }
});

// Export Reducer
export default appReducer;
