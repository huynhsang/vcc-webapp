// Import Actions

import { createReducer } from 'redux-starter-kit';
import {
    setIsAuthenticatedFn,
    setToAuthenticateFn,
    toggleMobileAsideFn,
    toggleContactUsFn,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    getCurrentUserFailure
} from '../actions/app';

const defaultState = {
    isAuthenticated: false,
    toAuthenticate: '',
    isOpenMobileAside: false,
    isOpenContactUs: false,
    isGettingUser: false,
    currentUser: null
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
    [getCurrentUserRequest]: (state, action) => {
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
    }
});

// Export Reducer
export default appReducer;
