import { createReducer } from 'redux-starter-kit';
import { hideAlertAction, showAlertAction } from '../actions/sweetAlert';

const sweetAlertDefault = {
    show: false,
    title: '',
    type: null,
    text: null,
    showCancelButton: false,
    confirmButtonText: '',
    cancelButtonText: '',
    confirmName: '', //Prevent from storing function
};

const defaultState = { ...sweetAlertDefault };

const alertReducer = createReducer(defaultState, {
    [hideAlertAction]: (state, action) => {
        Object.assign(state, { ...sweetAlertDefault });
    },
    [showAlertAction]: (state, action) => {
        Object.assign(state, action.payload);
    },
});

// Export Reducer
export default alertReducer;
