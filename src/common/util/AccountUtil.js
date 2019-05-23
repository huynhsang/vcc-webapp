import AccountJWTService from "../../modules/user/service/AccountJWTService";
import Result from "../../global/Result";
import RootScope from "../../global/RootScope";
import {failedAuthentication, isAuthenticated} from "../../modules/app/action/App";
import type {User} from "../../domain/User";
import CoreService from "../../global/CoreService";

const accountService = CoreService.accountService;
export default class AccountUtil {

	static getCurrentUser(): User {
		return AccountJWTService.getAccount(RootScope.token).then((res: Result) => {
			if (res.isSuccess()) {
				RootScope.currentUser = res.data;
				return RootScope.currentUser;
			} else {
				return RootScope.currentUser = null;
			}
		})
	}

	static updateApplicationAfterAuthenticated(dispatch: Function) {
		if (RootScope.currentUser) {
			dispatch(isAuthenticated());
		} else {
			dispatch(failedAuthentication());
		}
	}

	static searchUserByEmail(email: string): User {
		return accountService.findOneByEmail(email).then((res: Result) => {
			if (res.isSuccess()) {
				console.log(res.data);
				return res.data;
			} else {
				return null;
			}
		})
	}
}