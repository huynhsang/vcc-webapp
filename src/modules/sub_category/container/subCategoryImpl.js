import connect from "react-redux/es/connect/connect";
import SubCategory from "../component/subCategory";
import Result from "../../../global/Result";
import CoreService from "../../../global/CoreService";

const subCategoryService = CoreService.subCategoryService;

function getSubCategories(_this: SubCategory) {
    return () => {
        subCategoryService.findAll({})
            .then((result: Result) => {
                if (result.success) {
                    _this.changeStateValue('subCategories', result.data);
                }
            })
            .catch(err => {
                //    to do: handle error here
            })
    }
}

const SubCategoryImpl = connect(
    null,
    { getSubCategories }
)(SubCategory);
export default SubCategoryImpl;
