import connect from "react-redux/es/connect/connect";
import MainPage from "../component/content/MainPage";
import CoreService from "../../../global/CoreService";
import type {Filter} from "../../../global/Filter";
import Result from "../../../global/Result";
import RootScope from "../../../global/RootScope";
import type {UsersVoteQuestions} from "../../../domain/UsersVoteQuestions";
import type {Question} from "../../../domain/Question";

const questionService = CoreService.questionService;
const usersVoteService = CoreService.usersVoteService;

const orderMaps = {
    'recent-questions': 'created DESC',
    'most-answered': 'numberOfAnswers DESC',
    'most-visited': 'numberOfViews DESC',
    'most-voted': 'numberOfVotes DESC',
};

/**
 * The method will get questions as the filter
 * @param filter: {Filter} the filter object
 * @param show: {String} The type of display
 * @param _this: {MainPage} The MainPage UI
 * @return {Function}
 */
function getQuestions(filter: Filter, show: String, _this: MainPage) {
    return () => {
        filter.where = {
            isHidden: false,
            isVerified: true,
        };
        if (show === "no-answers") filter.where.numberOfAnswers = 0;
        else if (!orderMaps[show]) {
            show = "recent-questions";
            window.location.search = "?show=recent-questions"
        }
        filter.order = orderMaps[show];
        let questions = _this.getDataFromState("questions");
        questionService.findAll(filter).then((result: Result) => {
            if (result.success) {
                const currentShow = _this.getDataFromState("show");
                questions = currentShow === show ? questions.concat(result.data) : result.data;
                console.log(questions);
                _this.changeStateValues(new Map([["questions", questions], ["show", show]]));

            } else {
                // Todo: Handle error here
            }
        });
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

const MainPageImpl = connect(
    null,
    {getQuestions, handleVoteQuestion}
)(MainPage);
export default MainPageImpl;