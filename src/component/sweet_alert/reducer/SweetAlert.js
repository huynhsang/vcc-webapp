import SweetAlert from "../../../global/SweetAlert";

const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

// Export Actions
export function showAlert(alert) {
	return {
		type: SHOW_ALERT,
		alert
	}
}

export function hideAlert() {
	return {
		type: HIDE_ALERT
	}
}

// Initial State

const initialDefaultAlertState = SweetAlert.hideBuilder();

const AlertState = (state = initialDefaultAlertState, action) => {
	switch (action.type) {
		case HIDE_ALERT:
			return SweetAlert.hideBuilder();
		case SHOW_ALERT:
			return action.alert;
		default:
			return state;
	}
};

// Export Reducer
export default AlertState
