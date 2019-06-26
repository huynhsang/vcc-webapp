import Result from "./../../../global/Result";
import RootScope from "../../../global/RootScope";
import BasicService from "../../../common/abstract/services/BasicService";
import ApplicationUtil from "../../../common/util/ApplicationUtil";
import type {RegisterRequest} from "../request/RegisterRequest";
import type {LoginRequest} from "../request/LoginRequest";

const AUTHENTICATE_API: string = RootScope.appApiUrl + 'users/login';
const ACCOUNT_REGISTRATION_API: string = RootScope.appApiUrl + 'users';
const CURRENT_USER_API: string = RootScope.appApiUrl + 'users/{0}?access_token={1}';

export default class AccountJWTService extends BasicService {

	static
	doAuthenticate(loginRequest: LoginRequest): Result {
		return this.post(AUTHENTICATE_API, loginRequest, RootScope.axiosDefaultConfig);
	};

	static
	createAccount(registerRequest: RegisterRequest): Result {
		return this.post(ACCOUNT_REGISTRATION_API, registerRequest,RootScope.axiosDefaultConfig);
	}

	static
	getAccount(token: string, userId: number): Result {
		const full_api = ApplicationUtil.formatString(CURRENT_USER_API, [userId, token]);
		return this.get(full_api, RootScope.axiosDefaultConfig);
	}
}