import connect from 'react-redux/es/connect/connect';
import AnswersUI from '../component/AnswersUI';
import type { Answer } from '../../../domain/Answer';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';
import RootScope from '../../../global/RootScope';
import type { UsersVoteAnswers } from '../../../domain/UsersVoteAnswers';
import type { Question } from '../../../domain/Question';
import ApplicationUtil from '../../../common/util/ApplicationUtil';

import {
    showSuccessAlertFn,
    showErrorAlertFn,
} from '../../../actions/sweetAlert';

const answerService = CoreService.answerService;
const usersVoteService = CoreService.usersVoteService;
const questionService = CoreService.questionService;

/**
 * The method ensure every user should login before continue answer the question
 * @param isAuthenticated: {Boolean} Is authenticated
 * @param redirect: {any} The router redirect
 * @return {Function}
 */
function leaveAnswerValidation(
    isAuthenticated: boolean,
    setLeaveAnswer,
    redirectTo
) {
    return () => {
        if (!isAuthenticated) {
            return redirectTo('/login');
        }
        setLeaveAnswer(true);
    };
}

/**
 * The method handles logic to create new answer
 * @param answerBody: {String} The answer body
 * @param questionId: {Number} The question Id
 * @return {Function}
 */
function createNewAnswer(
    answerBody: string,
    questionId: number,
    answersEditted,
    setAnswersEditted,
    setAnswerBody
) {
    return dispatch => {
        const descrLength: number = answerBody.length / 3;
        const answerRequest: Answer = {
            body: answerBody,
            description: answerBody.substring(0, descrLength),
            questionId: questionId,
        };
        answerService.create(answerRequest).then((result: Result) => {
            if (result.success) {
                const answers = answersEditted || [];
                answers.unshift(result.data);
                dispatch(showSuccessAlertFn('Success!', 'Leaved an answer'));
                setAnswersEditted(answers);
                setAnswerBody('');
            } else {
                dispatch(
                    showErrorAlertFn(
                        'Error!',
                        ApplicationUtil.getErrorMsg(result.data)
                    )
                );
            }
        });
    };
}

function approveAnswer(
    question: Question,
    answer: Answer,
    setDisableApproveBtn,
    triggerUpdateQuestion
) {
    return dispatch => {
        setDisableApproveBtn(true);
        questionService
            .doApproveAnswer(question.id, answer.id)
            .then((result: Result) => {
                if (result.success) {
                    question.hasAcceptedAnswer = answer.isTheBest = true;
                    setDisableApproveBtn(false);
                    triggerUpdateQuestion(question);
                } else {
                    dispatch(
                        showErrorAlertFn(
                            'Error!',
                            ApplicationUtil.getErrorMsg(result.data)
                        )
                    );
                }
            });
    };
}

/**
 * The method handle when user vote on answer.
 * @param answer: {Answer} The answer instance
 * @param isPositiveVote: {boolean} The value to check It's positive vote or not?
 * @param isVotedBefore: {boolean} The value to check It's voted before or not?
 * @return {Function}
 */
function handleVoteAnswer(
    answer: Answer,
    isPositiveVote: boolean,
    isVotedBefore: boolean,
    setLoader,
    redirectTo
) {
    return dispatch => {
        if (!RootScope.userId) return redirectTo('/login');
        setLoader({ answerId: answer.id });
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
                    updateUIAfterVote(
                        answer,
                        isPositiveVote,
                        isVotedBefore,
                        setLoader
                    );
                } else {
                    // Todo: Show error here
                    setLoader(false);
                    dispatch(
                        showErrorAlertFn(
                            'Error!',
                            ApplicationUtil.getErrorMsg(result.data)
                        )
                    );
                }
            });
        } else {
            usersVoteService.voteAnswer(data).then((result: Result) => {
                if (result.success) {
                    answer.votes = [result.data];
                    updateUIAfterVote(
                        answer,
                        isPositiveVote,
                        isVotedBefore,
                        setLoader
                    );
                } else {
                    // Todo: Show error here
                    setLoader(false);
                    dispatch(
                        showErrorAlertFn(
                            'Error!',
                            ApplicationUtil.getErrorMsg(result.data)
                        )
                    );
                }
            });
        }
    };
}

function updateUIAfterVote(
    answer: Answer,
    isPositiveVote: boolean,
    isVotedBefore: boolean,
    setLoader
): void {
    const times: number = isVotedBefore ? 2 : 1;
    if (isPositiveVote) {
        answer.numberOfVotes += times;
    } else {
        answer.numberOfVotes -= times;
    }
    setLoader(false);
}

const mapStateToProps = ({ AppAuth: { isAuthenticated } }) => ({
    isAuthenticated,
});

//TOTO: Integrate to Component
const mapDispatchToProps = dispatch => ({
    leaveAnswerValidation,
    createNewAnswer: (
        answerBody,
        questionId,
        answersEditted,
        setAnswersEditted,
        setAnswerBody
    ) =>
        dispatch(
            createNewAnswer(
                answerBody,
                questionId,
                answersEditted,
                setAnswersEditted,
                setAnswerBody
            )
        ),
    handleVoteAnswer: (
        answer,
        isPositiveVote,
        isVotedBefore,
        setLoader,
        redirectTo
    ) =>
        dispatch(
            handleVoteAnswer(
                answer,
                isPositiveVote,
                isVotedBefore,
                setLoader,
                redirectTo
            )
        ),
    approveAnswer: (
        question,
        answer,
        setDisableApproveBtn,
        triggerUpdateQuestion
    ) =>
        dispatch(
            approveAnswer(
                question,
                answer,
                setDisableApproveBtn,
                triggerUpdateQuestion
            )
        ),
});

const AnswersImpl = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnswersUI);
export default AnswersImpl;
