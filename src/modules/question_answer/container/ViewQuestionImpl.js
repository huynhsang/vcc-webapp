import connect from "react-redux/es/connect/connect";
import ViewQuestion from "../component/ViewQuestion";
import Result from "../../../global/Result";
import CoreService from "../../../global/CoreService";

const questionService = CoreService.questionService;
const answerService = CoreService.answerService;

/**
 * The method handles to get question detail by Id
 * @param questionId: {Number} The question Id
 * @param _this: {ViewQuestion} The question detail UI
 * @param redirect: {any} The router redirect
 * @return {Function}
 */
function getQuestionDetail(questionId: number, _this: ViewQuestion, redirect: any) {
    return () => {
        questionService.findOneById(questionId).then((result: Result) => {
            if (result.success && Object.keys(result.data).length > 0) {
                _this.changeStateValues(new Map([['question', result.data], ['answers', result.data.answers]]));
            } else {
                redirect.push('/');
            }
        }).catch(() => redirect.push('/'));
    }
}

/**
 * The method handles to load more answers for the question
 * @param questionId: {Number} The question Id
 * @param _this: {ViewQuestion} The question detail UI
 * @return {Function}
 */
function loadMoreAnswers(questionId: number, _this: ViewQuestion) {
    return () => {
        let answers = _this.getDataFromState("answers") || [];
        const filter = {skip: answers.length};
        answerService.getAnswersByQuestionId(questionId, filter).then((result: Result) => {
            if (result.success) {
                answers = answers.concat(result.data);
                _this.changeStateValue('answers', answers);
            }
        })
    }
}

const ViewQuestionImpl = connect(
    null,
    {getQuestionDetail, loadMoreAnswers}
)(ViewQuestion);
export default ViewQuestionImpl;