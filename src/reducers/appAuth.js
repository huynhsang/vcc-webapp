// Import Actions

import { createReducer } from 'redux-starter-kit';
import { setIsAuthenticatedFn, setToAuthenticateFn } from '../actions/appAuth';

const defaultState = {
    isAuthenticated: false,
    toAuthenticate:'',
};

const appAuthReducer = createReducer(defaultState, {
    [setIsAuthenticatedFn]: (state, action) => {
        const {payload} = action;
        state.isAuthenticated = payload;
    },
    [setToAuthenticateFn]: (state, action) => {
        const {payload} = action;
        state.toAuthenticate = payload;
    },
});

// Export Reducer
export default appAuthReducer;
