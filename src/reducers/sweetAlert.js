import SweetAlert from "../global/SweetAlert";
// Import Actions

import { createReducer } from 'redux-starter-kit';
import { hideAlertAction, showAlertAction } from '../actions/sweetAlert';

const defaultState = SweetAlert.hideBuilder();

const alertReducer = createReducer(defaultState, {
    [hideAlertAction]: (state, action) => {
        SweetAlert.hideBuilder();
    },
    [showAlertAction]: (state, action) => {
        Object.assign(state, action.payload.alert);
    },
});

// Export Reducer
export default alertReducer;

