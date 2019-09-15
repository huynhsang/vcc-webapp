import connect from 'react-redux/es/connect/connect';
import AddQuestion from '../component/AddQuestion';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';
import { Question } from '../../../domain/Question';
import ApplicationUtil from '../../../common/util/ApplicationUtil';

import { showSuccessAlertFn } from '../../../actions/sweetAlert';

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
    return dispatch => {
        questionService.create(question).then((result: Result) => {
            if (result.success) {
                dispatch(showSuccessAlertFn('Success!', 'Created a Question'));
                redirect.push(`/question/${result.data.slug}/view`);
            } else {
                dispatch(
                    showSuccessAlertFn(
                        'Error!',
                        ApplicationUtil.getErrorMsg(result.data)
                    )
                );
            }
        });
    };
}

//TOTO: Integrate to Component
const mapDispatchToProp = dispatch => ({
    getSubCategoriesByCategory,
    createQuestion: (question, redirect) =>
        dispatch(createQuestion(question, redirect)),
});

const AddQuestionImpl = connect(
    null,
    mapDispatchToProp
)(AddQuestion);

export default AddQuestionImpl;
