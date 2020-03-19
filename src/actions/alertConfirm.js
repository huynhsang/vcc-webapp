import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

const { SHOW_LOGIN_CONFIRM, SET_ALERT_SNACKBAR } = actionsNames;

export const showLoginConfirmFn = createAction(SHOW_LOGIN_CONFIRM);

export const setAlertFn = createAction(SET_ALERT_SNACKBAR);

export const showAlertFn = ({ title = '', severity = '' }) => dispatch => {
    dispatch(
        setAlertFn({
            open: true,
            title,
            severity
        })
    );
};

const customAlert = severity => title => dispatch => {
    dispatch(
        showAlertFn({
            title,
            severity
        })
    );
};

export const errorAlertFn = customAlert('error');
export const warningAlertFn = customAlert('warning');
export const infoAlertFn = customAlert('info');
export const successAlertFn = customAlert('success');