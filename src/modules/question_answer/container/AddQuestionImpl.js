import connect from 'react-redux/es/connect/connect';
import AddQuestion from '../component/AddQuestion';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';
import type { Question } from '../../../domain/Question';
import SweetAlert from '../../../global/SweetAlert';
import ApplicationUtil from '../../../common/util/ApplicationUtil';

const questionService = CoreService.questionService;
const subCategoryService = CoreService.subCategoryService;

function getSubCategoriesByCategory(category, cb) {
  return () => {
    subCategoryService
      .getSubCategoriesByCategory(category)
      .then((result: Result) => {
        if (result.success) {
          cb(result.data);
        } else {
          // Todo: handle error here
        }
      });
  };
}

function createQuestion(question: Question, redirect: any) {
  return () => {
    questionService.create(question).then((result: Result) => {
      if (result.success) {
        SweetAlert.show(
          SweetAlert.successAlertBuilder('Success!', 'Created a Question')
        );
        redirect.push(`/question/${result.data.slug}/view`);
      } else {
        SweetAlert.show(
          SweetAlert.errorAlertBuilder(
            'Error!',
            ApplicationUtil.getErrorMsg(result.data)
          )
        );
      }
    });
  };
}

const AddQuestionImpl = connect(
  null,
  { getSubCategoriesByCategory, createQuestion }
)(AddQuestion);
export default AddQuestionImpl;
