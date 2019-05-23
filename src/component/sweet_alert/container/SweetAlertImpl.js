import {connect} from 'react-redux';
import MySweetAlert from '../SweetAlertUI';
import SweetAlert from "../../../global/SweetAlert";
import {hideAlert, showAlert} from "../reducer/SweetAlert";

function show(alert: SweetAlert) {
	return (dispatch) => {
		dispatch(showAlert(alert));
	}
}

function hide() {
	return (dispatch) => {
		dispatch(hideAlert());
	}
}

const mapStateToProps = (store) => ({
	alertInfo: store.AlertState
});

const MySweetAlertImpl = connect(
	mapStateToProps,
	{show, hide}
)(MySweetAlert);
export default MySweetAlertImpl;