export interface LoginRequest {
	realm: string,
	email: string;
	password: string;
	rememberMe: boolean;
}

export default class LoginRequestBuilder {
	static
	build(username: string, password: string, rememberMe: boolean): LoginRequest {
		let loginRequest: LoginRequest = {};
		loginRequest.realm = "user_app";
		loginRequest.email = username;
		loginRequest.password = password;
		loginRequest.rememberMe = rememberMe;
		return loginRequest;
	}
}