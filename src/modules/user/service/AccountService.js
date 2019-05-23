import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import type {IAccountService} from "../../../common/abstract/services/IAccountService";
import type {Pageable} from "../../../global/Pageable";
import RootScope from "../../../global/RootScope";

const ACCOUNT_API = RootScope.appApiUrl + 'account';

export default class AccountService extends BasicService implements IAccountService {

	save(data: any): Result {
		return super.save(data);
	}

	findAll(pageable: Pageable): Result {
		return super.findAll(pageable);
	}

	findOne(id: number): Result {
		return super.findOne(id);
	}

	delete(id: number): Result {
		return super.delete(id);
	}

	findOneByEmail(email: string): Result {
		const fullUrl: string = `${ACCOUNT_API}/search`;
		return AccountService.post(fullUrl, email, RootScope.axiosConfigWithAuth);
	}

	static builder(): IAccountService {
		return new AccountService();
	}
}