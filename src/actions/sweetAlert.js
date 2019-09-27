import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { SweetType } from '../constants/sweet-alert.constant';

import { TO_LOGIN } from '../component/SweetAlert';

import {i18n} from '../services/localize';

const { SHOW_ALERT, HIDE_ALERT } = actionsNames;

export const showAlertAction = createAction(SHOW_ALERT);
export const hideAlertAction = createAction(HIDE_ALERT);

const showGeneralAlert = (type: string) => (
    title: string,
    text: string,
    confirmButtonText: string = 'OK'
) => {
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
const showGeneralConfirmAlert = (type: string) => (
    title: string,
    text: string,
    confirmButtonText: string,
    confirmName: void,
    cancelButtonText: string = 'Cancel'
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

export const showConfirmToLoginFn = () => dispatch => {
    dispatch(
        showInfoConfirmAlertFn(
            i18n.t('common_login'),
            i18n.t('login_thank_to_login_to_continue'),
            'OK',
            TO_LOGIN
        )
    );
};
