import type {IService} from "./IService";
import Result from "../../../global/Result";

export interface ISubCategoryService extends IService {
    getSubCategoriesByCategory(category: string): Result;
}
