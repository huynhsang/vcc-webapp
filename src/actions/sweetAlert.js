import { createAction } from 'redux-starter-kit';
import actionsNames from './actionNames';
import SweetAlert from "../global/SweetAlert";

const {
	SHOW_ALERT,
	HIDE_ALERT
} = actionsNames;

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
