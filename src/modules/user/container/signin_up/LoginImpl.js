import { connect } from 'react-redux';
import Login from '../../component/signin_up/Login';
import { LoginRequest } from '../../request/LoginRequest';
import AccountJWTService from './../../service/AccountJWTService';
import RootScope from './../../../../global/RootScope';
import Result from './../../../../global/Result';
import {
    getCurrentUser,
    updateApplicationAfterAuthenticated,
} from './../../../../common/util/AccountUtil';
import ApplicationUtil from '../../../../common/util/ApplicationUtil';
import CookieHelper from './../../../../common/util/CookieHelper';
import CookieConstant from './../../../../common/constant/CookieConstant';

import { showSuccessAlertFn } from '../../../../actions/sweetAlert';

/**
 * The method handles logic to authenticate login request
 * @param loginData: {LoginRequest} The login request
 * @param redirect: {any} The router redirect
 * @return {function(*=): *}
 */
function doLogin(loginData: LoginRequest, redirect: any): void {
    return dispatch => {
        return AccountJWTService.doAuthenticate(loginData).then(
            (result: Result) => {
                if (result.isSuccess()) {
                    RootScope.token = result.data.id;
                    RootScope.userId = result.data.userId;
                    const exdays = loginData.rememberMe
                        ? CookieConstant.maxExDay
                        : CookieConstant.minExDay;
                    CookieHelper.setCookie(
                        CookieConstant.jwtTokenName,
                        RootScope.token,
                        exdays
                    );
                    CookieHelper.setCookie(
                        CookieConstant.userIdKey,
                        RootScope.userId,
                        exdays
                    );
                    getCurrentUser().then(() => {
                        dispatch(updateApplicationAfterAuthenticated());
                        dispatch(showSuccessAlertFn('Success!', 'Logged in'));
                        redirect.push('/');
                    });
                } else {
                    RootScope.resetAuthValues();
                    dispatch(
                        showSuccessAlertFn(
                            'Error!',
                            ApplicationUtil.getErrorMsg(result.data)
                        )
                    );
                    // Todo: show error here
                }
            }
        );
    };
}

const mapDispatchToProp = dispatch => ({
    doLogin: (loginData, redirect) => dispatch(doLogin(loginData, redirect)),
});

const LoginImpl = connect(
    null,
    mapDispatchToProp
)(Login);
export default LoginImpl;
