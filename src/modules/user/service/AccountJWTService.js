import Result from "./../../../global/Result";
import AxiosConfig from "./../../../global/AxiosConfig";
import RootScope from "../../../global/RootScope";
import BasicService from "../../../common/abstract/services/BasicService";
import type {RegisterRequest} from "../request/RegisterRequest";
import type {LoginRequest} from "../request/LoginRequest";

const AUTHENTICATE_API: string = RootScope.appBackendUrl + 'authenticate';
const ACCOUNT_REGISTRATION_API: string = RootScope.appBackendUrl + 'register';
const CURRENT_USER_API: string = RootScope.appApiUrl + 'account';

export default class AccountJWTService extends BasicService {
	static
	config: AxiosConfig = AxiosConfig.getDefaultConfig();

	static
	doAuthenticate(loginRequest: LoginRequest): Result {
		return this.post(AUTHENTICATE_API, loginRequest, AccountJWTService.config);
	};

	static
	createAccount(registerRequest: RegisterRequest): Result {
		return this.post(ACCOUNT_REGISTRATION_API, registerRequest, AccountJWTService.config);
	}

	static
	getAccount(token: string): Result {
		RootScope.axiosConfigWithAuth = AxiosConfig.getDefaultConfigWithAuth(token);
		return this.get(CURRENT_USER_API, RootScope.axiosConfigWithAuth);
	}
}