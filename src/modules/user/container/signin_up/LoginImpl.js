import {connect} from 'react-redux';
import Login from '../../component/signin_up/Login';
import type {LoginRequest} from "../../request/LoginRequest";
import AccountJWTService from './../../service/AccountJWTService';
import RootScope from './../../../../global/RootScope';
import Result from './../../../../global/Result';
import AccountUtil from './../../../../common/util/AccountUtil';
import CookieHelper from './../../../../common/util/CookieHelper';
import CookieConstant from './../../../../common/constant/CookieConstant';

function doLogin(loginData: LoginRequest, redirect: any): void {
	return (dispatch) => {
		return AccountJWTService.doAuthenticate(loginData).then((result: Result) => {
			if (result.isSuccess()) {
				RootScope.token = result.data.id_token;
				CookieHelper.setCookie(CookieConstant.jwtTokenName, RootScope.token,
					(loginData.rememberMe ? CookieConstant.maxExDay : CookieConstant.minExDay));
				AccountUtil.getCurrentUser().then(() => {
					AccountUtil.updateApplicationAfterAuthenticated(dispatch);
					redirect.push('/');
				});
			} else {
				//show error here
			}
		});
	}
}

const LoginImpl = connect(
	null,
	{doLogin}
)(Login);
export default LoginImpl;