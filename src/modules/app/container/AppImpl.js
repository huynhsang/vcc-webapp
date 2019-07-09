import {connect} from 'react-redux';
import App from './../component/App';
import AccountUtil from "../../../common/util/AccountUtil";
import CookieHelper from "../../../common/util/CookieHelper";
import CookieConstant from "../../../common/constant/CookieConstant";
import {failedAuthentication} from "../action/App";

function verifyToken() {
	return (dispatch) => {
		AccountUtil.getCurrentUser().then(() => {
			AccountUtil.updateApplicationAfterAuthenticated(dispatch);
		})
	}
}

function logout() {
    return (dispatch) => {
        CookieHelper.deleteCookie(CookieConstant.jwtTokenName);
        CookieHelper.deleteCookie(CookieConstant.userIdKey);
        dispatch(failedAuthentication());
    }
}

// Retrieve data from store as props
const mapStateToProps = (store) => ({
	auth: store.AppAuth
});

export default connect(
	mapStateToProps,
	{verifyToken, logout}
)(App);