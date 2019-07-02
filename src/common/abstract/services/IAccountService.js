import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {Filter} from "../../../global/Filter";

export interface IAccountService extends IService {
	findOneByEmail(email: string): Result;

	getTopUsersWithTheHighestPoints(filter: Filter): Result;
}