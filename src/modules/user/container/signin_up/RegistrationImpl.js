import {connect} from 'react-redux';
import Registration from '../../component/signin_up/Registration';
import AccountJWTService from '../../service/AccountJWTService';
import Result from '../../../../global/Result';
import type {RegisterRequest} from '../../request/RegisterRequest';
import SweetAlert from '../../../../global/SweetAlert';
import ApplicationUtil from '../../../../common/util/ApplicationUtil';

/**
 * The method handles to register new account
 * @param registerData: {RegisterRequest} The register request
 * @param redirect: {any} The router redirect
 * @return {function(): *}
 */
function doRegister(registerData: RegisterRequest, redirect: any): void {
	return () => {
		return AccountJWTService.createAccount(registerData).then((result: Result) => {
			if (result.isSuccess()) {
				SweetAlert.show(SweetAlert.successAlertBuilder("Success!", "Check your email to complete the registration!"));
				redirect.push('/login');
			} else {
				SweetAlert.show(SweetAlert.errorAlertBuilder('Error!',  ApplicationUtil.getErrorMsg(result.data)));
				//show err here
			}
		})
	}
}

const RegistrationImpl = connect(
	null,
	{doRegister}
)(Registration);
export default RegistrationImpl;
