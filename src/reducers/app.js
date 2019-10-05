// Import Actions

import { createReducer } from 'redux-starter-kit';
import {
    setIsAuthenticatedFn,
    setToAuthenticateFn,
    toggleMobileAsideFn
} from '../actions/app';

const defaultState = {
    isAuthenticated: false,
    toAuthenticate: '',
    isOpenMobileAside: false
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
    }
});

// Export Reducer
export default appReducer;
