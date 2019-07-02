import connect from "react-redux/es/connect/connect";
import AddQuestion from "../component/AddQuestion";
import CoreService from "../../../global/CoreService";
import Result from "../../../global/Result";
import type {Question} from "../../../domain/Question";

const questionService = CoreService.questionService;
const subCategoryService = CoreService.subCategoryService;

function getSubCategoriesByCategory(category, _this: AddQuestion) {
    return () => {
        subCategoryService.getSubCategoriesByCategory(category)
            .then((result: Result) => {
                if (result.success) {
                    _this.changeStateValue('subCategories', result.data);
                } else {
                    // Todo: handle error here
                }
            })
    }
}

function createQuestion(question: Question, redirect: any) {
    return () => {
        questionService.create(question).then((result: Result) => {
            if (result.success) {
                redirect.push(`/question/${result.data.id}/view`);
            }
        })
    }
}

const AddQuestionImpl = connect(
    null,
    { getSubCategoriesByCategory, createQuestion }
)(AddQuestion);
export default AddQuestionImpl;