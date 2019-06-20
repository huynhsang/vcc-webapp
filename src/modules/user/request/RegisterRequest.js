import ApplicationConstant from "../../../common/constant/ApplicationConstant";

export interface RegisterRequest {
	password: String;
	email: String;
	firstName: String;
	lastName: String;
    dateOfBirth: Date;
    nationality: string;
    realm: string;
    createdBy: string;
    updatedBy: string;
}

export default class RegisterRequestBuilder {
	static
	build(password: string, email: string, firstName: string, lastName: string, dateOfBirth: Date): RegisterRequest {
		let registerRequest: RegisterRequest = {};
		registerRequest.realm = ApplicationConstant.realm.user;
		registerRequest.password = password;
		registerRequest.email = email;
		registerRequest.firstName = firstName;
		registerRequest.lastName = lastName;
		registerRequest.dateOfBirth = dateOfBirth;
		registerRequest.createdBy = registerRequest.updatedBy = 'System';
		return registerRequest;
	}
}