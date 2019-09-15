import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { SweetType } from '../constants/sweet-alert.constant';

const { SHOW_ALERT, HIDE_ALERT } = actionsNames;

const alertBuilder = (
    title: string,
    type: string,
    text: string,
    confirmButtonText: string,
    onConfirm: void
) => ({
    show: true,
    title,
    type,
    text,
    showCanceltButton: false,
    confirmButtonText,
    cancelButtonText: null,
    onConfirm,
    onCancel: null,
});

const confirmAlertBuilder = (
    title: string,
    type: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
    onConfirm: void,
    onCancel: void
) => ({
    show: true,
    title,
    type,
    text,
    showCanceltButton: true,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel,
});

export const showAlertAction = createAction(SHOW_ALERT);
export const hideAlertAction = createAction(HIDE_ALERT);

export function showAlert(alert: SweetAlert) {
	return (dispatch) => {
		dispatch(showAlertAction(alert));
	}
} 

export function hideAlert() {
	return (dispatch) => {
		dispatch(showAlertAction());
	}
} 
