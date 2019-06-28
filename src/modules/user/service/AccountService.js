import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import type {IAccountService} from "../../../common/abstract/services/IAccountService";
import type {Filter} from "../../../global/Filter";
import RootScope from "../../../global/RootScope";

const ACCOUNT_API = RootScope.appApiUrl + 'account';

export default class AccountService extends BasicService implements IAccountService {

    create(data: any): Result {
		return super.save(data);
	}

	findAll(filter: Filter): Result {
		return super.findAll(filter);
	}

    deleteById(id: number): Result {
		return super.deleteById(id);
	}

	findOneByEmail(email: string): Result {
		const fullUrl: string = `${ACCOUNT_API}/search`;
		return AccountService.post(fullUrl, email, RootScope.axiosDefaultConfig);
	}

	static builder(): IAccountService {
		return new AccountService();
	}
}