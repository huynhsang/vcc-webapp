// import type {IService} from "../common/abstract/services/IService";
import type {IAccountService} from "../common/abstract/services/IAccountService";
import AccountService from "../modules/user/service/AccountService";

const ACCOUNT_SERVICE: IAccountService = AccountService.builder();

export default class CoreService {
	static get accountService(): IAccountService {
		return ACCOUNT_SERVICE;
	}
}