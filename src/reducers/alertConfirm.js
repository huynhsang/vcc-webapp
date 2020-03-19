import { createReducer } from 'redux-starter-kit';
import { showLoginConfirmFn, setAlertFn } from '../actions/alertConfirm';

const defaultState = {
    isShownConfirmLogin: false,
    alert: {
        severity: '',
        title: '',
        open: false,
        vertical: 'bottom',
        horizontal: 'left'
    }
};

const alertConfirm = createReducer(defaultState, {
    [showLoginConfirmFn]: (state, action) => {
        console.log(action.payload);
        state.isShownConfirmLogin =
            action.payload === undefined ? true : action.payload;
    },
    [setAlertFn]: (state, action) => {
        state.alert = action.payload;
    }
});

export default alertConfirm;
