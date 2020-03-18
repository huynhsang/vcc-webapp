import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { SweetType } from '../constants/sweet-alert.constant';

const { SHOW_ALERT, HIDE_ALERT } = actionsNames;

export const showAlertAction = createAction(SHOW_ALERT);
export const hideAlertAction = createAction(HIDE_ALERT);

const showGeneralAlert = type => (title, text, confirmButtonText = 'OK') => {
    return dispatch => {
        dispatch(
            showAlertAction({
                show: true,
                title,
                type,
                text,
                confirmButtonText
            })
        );
    };
};

export const showSuccessAlertFn = showGeneralAlert(SweetType.SUCCESS);
export const showErrorAlertFn = showGeneralAlert(SweetType.ERROR);
export const showWarningAlertFn = showGeneralAlert(SweetType.WARNING);
export const showInfoAlertFn = showGeneralAlert(SweetType.INFO);

//Atenttion for callback: onconfirm, oncancel, error immutable in redux
const showGeneralConfirmAlert = type => (
    title,
    text,
    confirmButtonText,
    confirmName,
    cancelButtonText = 'Cancel'
) => {
    return dispatch => {
        dispatch(
            showAlertAction({
                show: true,
                title,
                type,
                text,
                showCancelButton: true,
                confirmButtonText,
                cancelButtonText,
                confirmName
            })
        );
    };
};

export const showWarningConfirmAlertFn = showGeneralConfirmAlert(
    SweetType.WARNING
);

export const showInfoConfirmAlertFn = showGeneralConfirmAlert(SweetType.INFO);