import connect from 'react-redux/es/connect/connect';
import ViewQuestion from '../component/ViewQuestion';
import Result from '../../../global/Result';
import CoreService from '../../../global/CoreService';
import type { Question } from '../../../domain/Question';
import MainPage from '../../home/component/content/MainPage';
import RootScope from '../../../global/RootScope';
import type { UsersVoteQuestions } from '../../../domain/UsersVoteQuestions';
import ApplicationUtil from '../../../common/util/ApplicationUtil';

import {
  showSuccessAlertFn,
  showErrorAlertFn,
} from '../../../actions/sweetAlert';

const questionService = CoreService.questionService;
const answerService = CoreService.answerService;
const usersVoteService = CoreService.usersVoteService;

/**
 * The method handles to get question detail by Id
 * @param slug: {String} The question slug
 * @return {Function}
 */
function getQuestionDetail(slug: string, setQuestion, setAnswers, redirectTo) {
    return () => {
        questionService.findOneBySlug(slug).then((result: Result) => {
            if (
                result.success &&
                result.data &&
                Object.keys(result.data).length > 0
            ) {
                setQuestion(result.data);
                setAnswers(result.data.answers);
            } else {
                redirectTo('/');
            }
        });
    };
}

/**
 * The method handles to load more answers for the question
 * @param questionId: {Number} The question Id
 * @param _this: {ViewQuestion} The question detail UI
 * @return {Function}
 */
function loadMoreAnswers(questionId: number, _this: ViewQuestion) {
    return () => {
        let answers = _this.getDataFromState('answers') || [];
        const filter = { skip: answers.length };
        answerService
            .getAnswersByQuestionId(questionId, filter)
            .then((result: Result) => {
                if (result.success) {
                    answers = answers.concat(result.data);
                    _this.changeStateValue('answers', answers);
                }
            });
    };
}

/**
 * The method handle when user vote on question.
 * @param question: {Question} The question instance
 * @param isPositiveVote: {boolean} The value to check It's positive vote or not?
 * @param isVotedBefore: {boolean} The value to check It's voted before or not?
 * @return {Function}
 */
function handleVoteQuestion(
    question: Question,
    isPositiveVote: boolean,
    isVotedBefore: boolean,
    redirectTo,
    setLoader
) {
    return dispatch => {
        if (!RootScope.userId) return redirectTo('/login');
        setLoader({ questionId: question.id });
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
                    updateUIAfterVote(
                        question,
                        isPositiveVote,
                        isVotedBefore,
                        setLoader
                    );
                } else {
                    // Todo: Show error here
                    setLoader(false);
                    dispatch(
                      showSuccessAlertFn(
                          'Error!',
                          ApplicationUtil.getErrorMsg(result.data)
                      )
                  );
                }
            });
        } else {
            usersVoteService.voteQuestion(data).then((result: Result) => {
                if (result.success) {
                    question.votes = [result.data];
                    updateUIAfterVote(
                        question,
                        isPositiveVote,
                        isVotedBefore,
                        setLoader
                    );
                } else {
                    // Todo: Show error here
                    setLoader(false);
                    dispatch(
                      showSuccessAlertFn(
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
    question: Question,
    isPositiveVote: boolean,
    isVotedBefore: boolean,
    setLoader
): void {
    const times: number = isVotedBefore ? 2 : 1;
    if (isPositiveVote) {
        question.numberOfVotes += times;
    } else {
        question.numberOfVotes -= times;
    }
    setLoader(false);
}

const mapDispatchToProps = dispatch => ({
    getQuestionDetail,
    loadMoreAnswers,
    handleVoteQuestion: (
        question,
        isPositiveVote,
        isVotedBefore,
        redirectTo,
        setLoader
    ) =>
        dispatch(
            handleVoteQuestion(
                question,
                isPositiveVote,
                isVotedBefore,
                redirectTo,
                setLoader
            )
        ),
});

const ViewQuestionImpl = connect(
    null,
    mapDispatchToProps
)(ViewQuestion);

export default ViewQuestionImpl;
