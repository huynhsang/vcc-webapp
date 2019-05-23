import type {IService} from "./IService";
import Result from "../../../global/Result";

export interface IAccountService extends IService {
	findOneByEmail(email: string): Result;
}