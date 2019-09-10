import connect from 'react-redux/es/connect/connect';
import SubCategory from '../component/SubCategory';
import Result from '../../../global/Result';
import CoreService from '../../../global/CoreService';

const subCategoryService = CoreService.subCategoryService;

function getSubCategories(cb) {
  return () => {
    subCategoryService.findAll({}).then((result: Result) => {
      if (result.success) {
        cb(result.data);
      } else {
        // Todo: handle error here
      }
    });
  };
}

const SubCategoryImpl = connect(
  null,
  { getSubCategories }
)(SubCategory);
export default SubCategoryImpl;
