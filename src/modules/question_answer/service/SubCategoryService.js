import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import type {Filter} from "../../../global/Filter";
import RootScope from "../../../global/RootScope";
import FilterBuilder from "../../../global/Filter";
import type {ISubCategoryService} from "../../../common/abstract/services/ISubCategoryService";

const SUBCATEGORY_API = RootScope.appApiUrl + 'SubCategories';

export default class SubCategoryService extends BasicService implements ISubCategoryService {

    findAll(filter: Filter): Result {
        return super.findAll(filter);
    }

    getSubCategoriesByCategory(category: string): Result {
        const filter = {
            where: {
                categorySlug: category,
            }
        };
        const fullUrl = FilterBuilder.buildUrlWithFilter(SUBCATEGORY_API, filter);
        return SubCategoryService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    static builder(): ISubCategoryService {
        return new SubCategoryService();
    }
}