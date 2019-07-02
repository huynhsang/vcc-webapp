import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {Filter} from "../../../global/Filter";

export interface ISubCategoryService extends IService {
    getSubCategoriesByCategory(category: string): Result;

    getTrendingTags(filter: Filter): Result;
}
