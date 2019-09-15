// Import Actions

import { createReducer } from 'redux-starter-kit';
import { isAuthenticatedFn, failedAuthenticationFn } from '../actions/appAuth';

const defaultState = {};

const appAuthReducer = createReducer(defaultState, {
    [isAuthenticatedFn]: state => {
        state.isAuthenticated = true;
    },
    [failedAuthenticationFn]: state => {
        state.isAuthenticated = false;
    },
});

// Export Reducer
export default appAuthReducer;
