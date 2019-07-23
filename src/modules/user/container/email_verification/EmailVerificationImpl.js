import {connect} from 'react-redux';
import EmailVerification from '../../component/email_verification/EmailVerification';
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
function doVerifyEmail(uid: number, token: string, redirect: any, _this: EmailVerification): void {
	return (dispatch) => {
		return AccountJWTService.doVerifyEmail(uid, token).then((result: Result) => {
			if (result.isSuccess()) {
				_this.changeStateValue('message', 'Registration verified successfully');
			} else {
                _this.changeStateValue('message', 'Registration has not been successfully verified');
                // Todo: show error here
			}
		});
	}
}

const EmailVerificationImpl = connect(
	null,
	{doVerifyEmail}
)(EmailVerification);
export default EmailVerificationImpl;