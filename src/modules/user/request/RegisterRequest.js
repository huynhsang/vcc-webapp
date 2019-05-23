import ApplicationConstant from "../../../common/constant/ApplicationConstant";

export interface RegisterRequest {
	username: String;
	password: String;
	email: String;
	firstName: String;
	lastName: String;
	born: Date;
	gender: boolean;
	avatar: string;
	langKey: String;
	career: string;
}

export default class RegisterRequestBuilder {
	static
	build(username: string, password: string, email: string, firstName: string, lastName: string, born: Date,
				 gender: boolean): RegisterRequest {
		let registerRequest: RegisterRequest = {};
		registerRequest.username = username;
		registerRequest.password = password;
		registerRequest.email = email;
		registerRequest.firstName = firstName;
		registerRequest.lastName = lastName;
		registerRequest.born = born;
		registerRequest.gender = gender;
		registerRequest.avatar = (gender ? ApplicationConstant.maleAvatarDefault : ApplicationConstant.femaleAvatarDefault);
		registerRequest.langKey = ApplicationConstant.langKeyDefault;
		return registerRequest;
	}
}