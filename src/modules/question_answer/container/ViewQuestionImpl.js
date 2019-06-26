import connect from "react-redux/es/connect/connect";
import ViewQuestion from "../component/ViewQuestion";
import Result from "../../../global/Result";
import CoreService from "../../../global/CoreService";

const questionService = CoreService.questionService;
const answerService = CoreService.answerService;

function getQuestionDetail(questionId: number, _this: ViewQuestion, redirect: any): void {
    return () => {
        questionService.findOne(questionId).then((result: Result) => {
            if (result.success && Object.keys(result.data).length > 0) {
                _this.changeStateValues(new Map([['question', result.data], ['answers', result.data.answers]]));
            } else {
                redirect.push('/');
            }
        }).catch(() => redirect.push('/'));
    }
}

function loadMoreAnswers(questionId: number, _this: ViewQuestion): void {
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