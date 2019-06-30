import connect from "react-redux/es/connect/connect";
import AnswersUI from "../component/AnswersUI";
import type {Answer} from "../../../domain/Answer";
import CoreService from "../../../global/CoreService";
import Result from "../../../global/Result";
import MainPage from "../../home/component/content/MainPage";
import RootScope from "../../../global/RootScope";
import type {UsersVoteAnswers} from "../../../domain/UsersVoteAnswers";
import type {Question} from "../../../domain/Question";

const answerService = CoreService.answerService;
const usersVoteService = CoreService.usersVoteService;
const questionService = CoreService.questionService;

/**
 * The method ensure every user should login before continue answer the question
 * @param isAuthenticated: {Boolean} Is authenticated
 * @param _this: {AnswersUI} The answer UI
 * @param redirect: {any} The router redirect
 * @return {Function}
 */
function leaveAnswerValidation(isAuthenticated: boolean, _this: AnswersUI, redirect: any) {
    return () => {
        if (!isAuthenticated) {
            return redirect.push('/login');
        }
        _this.changeStateValue('leaveAnswer', true);
    }
}

/**
 * The method handles logic to create new answer
 * @param answerBody: {String} The answer body
 * @param questionId: {Number} The question Id
 * @param _this: {AnswersUI} The Answers UI
 * @return {Function}
 */
function createNewAnswer(answerBody: string, questionId: number, _this: AnswersUI) {
    return () => {
        const descrLength: number = answerBody.length / 3;
        const answerRequest: Answer = {
            body: answerBody,
            description: answerBody.substring(0, descrLength),
            questionId: questionId,
        };
        answerService.create(answerRequest).then((result: Result) => {
            if (result.success) {
                let answers = _this.getDataFromState("answers") || [];
                answers.unshift(result.data);
                _this.changeStateValues(new Map([["answers", answers], ["answerBody", ""]]));
            }
        }).catch((err) => {
            // To do: handle error
        })
    }
}

function approveAnswer(question: Question, answer: Answer, _this: AnswersUI) {
    return () => {
        _this.changeStateValue('disableApproveBtn', true);
        questionService.doApproveAnswer(question.id, answer.id).then((result: Result) => {
            if (result.success) {
                question.hasAcceptedAnswer = answer.isTheBest = true;
                _this.changeStateValue('disableApproveBtn', false);
                _this.triggerUpdateQuestion(question);
            }
        })
    }
}

/**
 * The method handle when user vote on answer.
 * @param answer: {Answer} The answer instance
 * @param isPositiveVote: {boolean} The value to check It's positive vote or not?
 * @param isVotedBefore: {boolean} The value to check It's voted before or not?
 * @param _this: {MainPage} The MainPage UI
 * @return {Function}
 */
function handleVoteAnswer(answer: Answer, isPositiveVote: boolean, isVotedBefore: boolean, _this: MainPage) {
    return () => {
        if (!RootScope.userId) return _this.redirectTo('/login');
        _this.changeStateValue('loader', {answerId: answer.id});
        const data: UsersVoteAnswers = {
            answerId: answer.id,
            isPositiveVote: isPositiveVote,
        };
        if (isVotedBefore) {
            data.id = answer.votes[0].id;
            data.userId = answer.votes[0].userId;
            usersVoteService.reVoteAnswer(data).then((result: Result) => {
                if (result.success) {
                    answer.votes[0].isPositiveVote = isPositiveVote;
                    updateUIAfterVote(answer, isPositiveVote, isVotedBefore, _this);
                }
            }).catch(err => {
                // Todo: Show error here
                _this.changeStateValue('loader', false);
            })
        } else {
            usersVoteService.voteAnswer(data).then((result: Result) => {
                if (result.success) {
                    answer.votes = [result.data];
                    updateUIAfterVote(answer, isPositiveVote, isVotedBefore, _this);
                }
            }).catch(err => {
                // Todo: Show error here
                _this.changeStateValue('loader', false);
            })
        }
    }
}

function updateUIAfterVote(answer: Answer, isPositiveVote: boolean, isVotedBefore: boolean, _this: MainPage): void {
    const times: number = isVotedBefore ? 2 : 1;
    if (isPositiveVote) {
        answer.numberOfVotes += times;
    } else {
        answer.numberOfVotes -= times;
    }
    _this.changeStateValue('loader', false);
}

const mapStateToProps = (store) => {
    return {
        isAuthenticated: store.AppAuth.isAuthenticated,
    }
};

const AnswersImpl = connect(
    mapStateToProps,
    { leaveAnswerValidation, createNewAnswer, handleVoteAnswer, approveAnswer }
)(AnswersUI);
export default AnswersImpl;