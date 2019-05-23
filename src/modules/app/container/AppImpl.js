import {connect} from 'react-redux';
import App from './../component/App';
import AccountUtil from "../../../common/util/AccountUtil";

function verifyToken() {
	return (dispatch) => {
		AccountUtil.getCurrentUser().then(() => {
			AccountUtil.updateApplicationAfterAuthenticated(dispatch);
		})
	}
}

// Retrieve data from store as props
const mapStateToProps = (store) => ({
	auth: store.AppAuth
});

export default connect(
	mapStateToProps,
	{verifyToken}
)(App);