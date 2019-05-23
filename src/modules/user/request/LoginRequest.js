export interface LoginRequest {
	username: string;
	password: string;
	rememberMe: boolean;
}

export default class LoginRequestBuilder {
	static
	build(username: string, password: string, rememberMe: boolean): LoginRequest {
		let loginRequest: LoginRequest = {};
		loginRequest.username = username;
		loginRequest.password = password;
		loginRequest.rememberMe = rememberMe;
		return loginRequest;
	}
}