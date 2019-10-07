// Import Actions

import { createReducer } from 'redux-starter-kit';
import {
    setIsAuthenticatedFn,
    setToAuthenticateFn,
    toggleMobileAsideFn,
    toggleContactUsFn
} from '../actions/app';

const defaultState = {
    isAuthenticated: false,
    toAuthenticate: '',
    isOpenMobileAside: false,
    isOpenContactUs: false
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
    }
});

// Export Reducer
export default appReducer;
