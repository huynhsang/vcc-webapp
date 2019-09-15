import { connect } from 'react-redux';
import App from './../component/App';
import {
    getCurrentUser,
    updateApplicationAfterAuthenticated,
} from '../../../common/util/AccountUtil';
import CookieHelper from '../../../common/util/CookieHelper';
import CookieConstant from '../../../common/constant/CookieConstant';
import { failedAuthenticationFn } from '../../../actions/appAuth';

function verifyToken() {
    return dispatch => {
        getCurrentUser().then(() => {
            dispatch(updateApplicationAfterAuthenticated());
        });
    };
}

function logout() {
    return dispatch => {
        CookieHelper.deleteCookie(CookieConstant.jwtTokenName);
        CookieHelper.deleteCookie(CookieConstant.userIdKey);
        dispatch(failedAuthenticationFn());
    };
}

// Retrieve data from store as props
const mapStateToProps = store => ({
    auth: store.AppAuth,
});

const mapDispatchToProps = dispatch => ({
    verifyToken: () => dispatch(verifyToken()),
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
