import connect from "react-redux/es/connect/connect";
import ViewQuestion from "../component/ViewQuestion";
import Result from "../../../global/Result";
import CoreService from "../../../global/CoreService";
import type {Question} from "../../../domain/Question";
import MainPage from "../../home/component/content/MainPage";
import RootScope from "../../../global/RootScope";
import type {UsersVoteQuestions} from "../../../domain/UsersVoteQuestions";
import SweetAlert from "../../../global/SweetAlert";
import ApplicationUtil from "../../../common/util/ApplicationUtil";

const questionService = CoreService.questionService;
const answerService = CoreService.answerService;
const usersVoteService = CoreService.usersVoteService;

/**
 * The method handles to get question detail by Id
 * @param slug: {String} The question slug
 * @param _this: {ViewQuestion} The question detail UI
 * @return {Function}
 */
function getQuestionDetail(slug: string, _this: ViewQuestion) {
    return () => {
        questionService.findOneBySlug(slug).then((result: Result) => {
            if (result.success && result.data && Object.keys(result.data).length > 0) {
                _this.changeStateValues(new Map([['question', result.data], ['answers', result.data.answers]]));
            } else {
                _this.redirectTo('/');
            }
        })
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

/**
 * The method handle when user vote on question.
 * @param question: {Question} The question instance
 * @param isPositiveVote: {boolean} The value to check It's positive vote or not?
 * @param isVotedBefore: {boolean} The value to check It's voted before or not?
 * @param _this: {MainPage} The MainPage UI
 * @return {Function}
 */
function handleVoteQuestion(question: Question, isPositiveVote: boolean, isVotedBefore: boolean, _this: MainPage) {
    return () => {
        if (!RootScope.userId) return _this.redirectTo('/login');
        _this.changeStateValue('loader', {questionId: question.id});
        const data: UsersVoteQuestions = {
            questionId: question.id,
            isPositiveVote: isPositiveVote,
        };
        if (isVotedBefore) {
            data.id = question.votes[0].id;
            data.userId = question.votes[0].userId;
            usersVoteService.reVoteQuestion(data).then((result: Result) => {
                if (result.success) {
                    question.votes[0].isPositiveVote = isPositiveVote;
                    updateUIAfterVote(question, isPositiveVote, isVotedBefore, _this);
                } else {
                    // Todo: Show error here
                    _this.changeStateValue('loader', false);
                    SweetAlert.show(SweetAlert.errorAlertBuilder('Error!',  ApplicationUtil.getErrorMsg(result.data)));
                }
            })
        } else {
            usersVoteService.voteQuestion(data).then((result: Result) => {
                if (result.success) {
                    question.votes = [result.data];
                    updateUIAfterVote(question, isPositiveVote, isVotedBefore, _this);
                } else {
                    // Todo: Show error here
                    _this.changeStateValue('loader', false);
                    SweetAlert.show(SweetAlert.errorAlertBuilder('Error!',  ApplicationUtil.getErrorMsg(result.data)));
                }
            })
        }
    }
}

function updateUIAfterVote(question: Question, isPositiveVote: boolean, isVotedBefore: boolean, _this: MainPage): void {
    const times: number = isVotedBefore ? 2 : 1;
    if (isPositiveVote) {
        question.numberOfVotes += times;
    } else {
        question.numberOfVotes -= times;
    }
    _this.changeStateValue('loader', false);
}

const ViewQuestionImpl = connect(
    null,
    {getQuestionDetail, loadMoreAnswers, handleVoteQuestion}
)(ViewQuestion);
export default ViewQuestionImpl;
