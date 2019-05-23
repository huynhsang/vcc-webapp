import Result from "../../../global/Result";
import type {Pageable} from "../../../global/Pageable";

export interface IService {
	create(data: any): Result;

	update(data: any): Result;

	findAll(pageable: Pageable): Result;

	findOneById(id: number): Result;

	deleteById(id: number): Result;

	static builder(): IService;
}