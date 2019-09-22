import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { SweetType } from '../constants/sweet-alert.constant';

const { SHOW_ALERT, HIDE_ALERT } = actionsNames;

const alertBuilder = (
    title: string,
    type: string,
    text: string,
    confirmButtonText: string
) => ({
    show: true,
    title,
    type,
    text,
    showCancelButton: false,
    confirmButtonText,
    cancelButtonText: null,
    onConfirm: null, //Set into sweet alert component
    onCancel: null
});

const confirmAlertBuilder = (
    title: string,
    type: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
    onConfirm: void
) => ({
    show: true,
    title,
    type,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel: null
});

export const showAlertAction = createAction(SHOW_ALERT);
export const hideAlertAction = createAction(HIDE_ALERT);

const showGeneralAlert = (type: string) => (title: string, text: string) => {
    return dispatch => {
        const alert = alertBuilder(title, type, text, 'OK');
        dispatch(showAlertAction(alert));
    };
};

export const showSuccessAlertFn = showGeneralAlert(SweetType.SUCCESS);
export const showErrorAlertFn = showGeneralAlert(SweetType.ERROR);
export const showWarningAlertFn = showGeneralAlert(SweetType.WARNING);
export const showInfoAlertFn = showGeneralAlert(SweetType.INFO);

//Atenttion for callback: onconfirm, oncancel, error immutable in redux
const showGeneralConfirmAlert = (type: string) => (
    title: string,
    text: string,
    confirmButtonText: string,
    onConfirm: void
) => {
    return dispatch => {
        const alert = confirmAlertBuilder(
            title,
            type,
            text,
            confirmButtonText,
            'Cancel',
            onConfirm
        );
        dispatch(showAlertAction(alert));
    };
};

export const showWarningConfirmAlertFn = showGeneralConfirmAlert(
    SweetType.WARNING
);
