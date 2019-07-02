import {connect} from 'react-redux';
import Login from '../../component/signin_up/Login';
import type {LoginRequest} from "../../request/LoginRequest";
import AccountJWTService from './../../service/AccountJWTService';
import RootScope from './../../../../global/RootScope';
import Result from './../../../../global/Result';
import AccountUtil from './../../../../common/util/AccountUtil';
import CookieHelper from './../../../../common/util/CookieHelper';
import CookieConstant from './../../../../common/constant/CookieConstant';

/**
 * The method handles logic to authenticate login request
 * @param loginData: {LoginRequest} The login request
 * @param redirect: {any} The router redirect
 * @return {function(*=): *}
 */
function doLogin(loginData: LoginRequest, redirect: any): void {
	return (dispatch) => {
		return AccountJWTService.doAuthenticate(loginData).then((result: Result) => {
			if (result.isSuccess()) {
				RootScope.token = result.data.id;
				RootScope.userId = result.data.userId;
				const exdays = loginData.rememberMe ? CookieConstant.maxExDay : CookieConstant.minExDay;
				CookieHelper.setCookie(CookieConstant.jwtTokenName, RootScope.token, exdays);
                CookieHelper.setCookie(CookieConstant.userIdKey, RootScope.userId, exdays);
				AccountUtil.getCurrentUser().then(() => {
					AccountUtil.updateApplicationAfterAuthenticated(dispatch);
					redirect.push('/');
				});
			} else {
                RootScope.resetAuthValues();
                // Todo: show error here
			}
		});
	}
}

const LoginImpl = connect(
	null,
	{doLogin}
)(Login);
export default LoginImpl;