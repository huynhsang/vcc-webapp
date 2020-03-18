import { createReducer } from 'redux-starter-kit';
import { showLoginConfirmFn } from '../actions/alertConfirm';

const defaultState = {
    isShownConfirmLogin: false
};

const alertConfirm = createReducer(defaultState, {
    [showLoginConfirmFn]: (state, action) => {
        console.log(action.payload);
        state.isShownConfirmLogin =
            action.payload === undefined ? true : action.payload;
    }
});

export default alertConfirm;
