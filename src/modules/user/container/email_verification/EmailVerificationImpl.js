import {connect} from 'react-redux';
import EmailVerification from '../../component/email_verification/EmailVerification';
import AccountJWTService from './../../service/AccountJWTService';
import Result from './../../../../global/Result';

/**
 * The method handles logic to authenticate login request
 * @param uid: {Number} The user id
 * @param token: {String} The token to verify
 * @param _this: {EmailVerification} The component
 * @return {function(*=): *}
 */
function doVerifyEmail(uid: number, token: string, _this: EmailVerification): void {
	return () => {
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
