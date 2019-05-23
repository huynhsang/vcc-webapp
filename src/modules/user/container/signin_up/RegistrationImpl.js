import {connect} from 'react-redux';
import Registration from '../../component/signin_up/Registration';
import AccountJWTService from "../../service/AccountJWTService";
import Result from "../../../../global/Result";
import type {RegisterRequest} from "../../request/RegisterRequest";

function doRegister(registerData: RegisterRequest, redirect: any): void {
	return () => {
		return AccountJWTService.createAccount(registerData).then((result: Result) => {
			if (result.isSuccess()) {
				redirect.push('/login');
			} else {
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