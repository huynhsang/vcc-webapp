import Result from "../global/Result";
import RootScope from "../global/RootScope";
import BasicService from "../common/abstract/services/BasicService";
import ApplicationUtil from "../common/util/ApplicationUtil";
import {RegisterRequest} from "../global/RegisterRequest";
import {LoginRequest} from "../global/LoginRequest";
import {ResetPasswordRequest, NewPasswordRequest} from "../global/ResetPasswordRequest";

const AUTHENTICATE_API: string = RootScope.appApiUrl + 'users/login';
const ACCOUNT_REGISTRATION_API: string = RootScope.appApiUrl + 'users';
const EMAIL_VERIFICATION_API: string = RootScope.appApiUrl + 'users/confirm?uid={0}&token={1}';
const CURRENT_USER_API: string = RootScope.appApiUrl + 'users/{0}?access_token={1}';
const REST_PASSWORD_URL = RootScope.appApiUrl + 'users/reset';
const SET_NEW_PASSWORD_URL = (access_token) => `${RootScope.appApiUrl}users/reset-password?access_token=${access_token}`

export default class AccountJWTService extends BasicService {

	static
	doAuthenticate(loginRequest: LoginRequest): Result {
		return this.post(AUTHENTICATE_API, loginRequest, RootScope.axiosDefaultConfig);
	}

	static
	doVerifyEmail(uid: number, token: string): Result {
		const fullUrl: string = ApplicationUtil.formatString(EMAIL_VERIFICATION_API, [uid, token]);
		return this.get(fullUrl, RootScope.axiosDefaultConfig);
	}

	static
	createAccount(registerRequest: RegisterRequest): Result {
		return this.post(ACCOUNT_REGISTRATION_API, registerRequest,RootScope.axiosDefaultConfig);
	}

	static
	getAccount(token: string, userId: number): Result {
		const full_api = ApplicationUtil.formatString(CURRENT_USER_API, [userId, token]);
		return this.get(full_api, RootScope.axiosDefaultConfig);
	}

	static
	doResetPassword(data : ResetPasswordRequest): Result {
		return this.post(REST_PASSWORD_URL, data, RootScope.axiosDefaultConfig);
	}

	static
	doSetNewPassword(token:string, data : NewPasswordRequest): Result {
		return this.post(SET_NEW_PASSWORD_URL(token), data, RootScope.axiosDefaultConfig);
	}
}