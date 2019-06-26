import Result from "../../../global/Result";
import type {Filter} from "../../../global/Filter";

export interface IService {
	create(data: any): Result;

	update(data: any): Result;

	findAll(filter: Filter): Result;

	findOneById(id: number): Result;

	deleteById(id: number): Result;

	static builder(): IService;
}