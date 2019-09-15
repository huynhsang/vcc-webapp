import {connect} from 'react-redux';
import MySweetAlert from '../SweetAlertUI';

import {showAlert, hideAlert} from '../../../actions/sweetAlert';

const mapStateToProps = ({AlertState}) => ({
	alertInfo: AlertState
});

const mapDispatchToProps = (dispatch) =>({
	show: alert => dispatch(showAlert(alert)),
	hide: () => dispatch(hideAlert(alert))
})

const MySweetAlertImpl = connect(
	mapStateToProps,
	mapDispatchToProps
)(MySweetAlert);
export default MySweetAlertImpl;