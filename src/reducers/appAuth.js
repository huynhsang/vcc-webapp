// Import Actions

import { createReducer } from 'redux-starter-kit';
import { isAuthenticated, failedAuthentication } from '../actions/appAuth';

const defaultState = {};

const appAuthReducer = createReducer(defaultState, {
    [isAuthenticated]: state => {
        state.isAuthenticated = true;
    },
    [failedAuthentication]: state => {
        state.isAuthenticated = false;
    },
});

// Export Reducer
export default appAuthReducer;
