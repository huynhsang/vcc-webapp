import Result from '../global/Result';
import BasicService from "../common/abstract/services/BasicService";
import type {IAccountService} from "../../../common/abstract/services/IAccountService";
import type {Filter} from "../../../global/Filter";
import RootScope from "../global/RootScope";
import FilterBuilder from "../global/Filter";

const ACCOUNT_API = RootScope.appApiUrl + 'users';

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

	findOneById(id: number): Result {
    	const fullUrl: string = `${ACCOUNT_API}/profile?id=${id}`;
		return AccountService.get(fullUrl, RootScope.axiosDefaultConfig);
	}

    getTopUsersWithTheHighestPoints(filter: Filter): Result {
        filter.order = "points DESC";
    	const fullUrl: string = FilterBuilder.buildUrlWithFilter(ACCOUNT_API, filter);
    	return AccountService.get(fullUrl, RootScope.axiosDefaultConfig)
	}

	static builder(): IAccountService {
		return new AccountService();
	}
}
