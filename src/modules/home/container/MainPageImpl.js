import connect from 'react-redux/es/connect/connect';
import MainPage from '../component/content/MainPage';
import CoreService from '../../../global/CoreService';
import type { Filter } from '../../../global/Filter';
import Result from '../../../global/Result';
import RootScope from '../../../global/RootScope';
import type { UsersVoteQuestions } from '../../../domain/UsersVoteQuestions';
import type { Question } from '../../../domain/Question';
import ApplicationUtil from '../../../common/util/ApplicationUtil';

import { showSuccessAlertFn } from '../../../actions/sweetAlert';

const questionService = CoreService.questionService;
const usersVoteService = CoreService.usersVoteService;

const orderMaps = {
    'recent-questions': 'createdOn DESC',
    'most-answered': 'numberOfAnswers DESC',
    'most-visited': 'numberOfViews DESC',
    'most-voted': 'numberOfVotes DESC',
};

/**
 * The method will get questions as the filter
 * @param filter: {Filter} the filter object
 * @param show: {String} The type of display
 * @return {Function}
 */
function getQuestions(
    filter: Filter,
    paramShow: String,
    redirectTo,
    questions,
    setQuestion,
    show,
    setShow
) {
    return () => {
        filter.where = {
            isHidden: false,
            isVerified: true,
        };
        let showEditted = paramShow;
        if (paramShow === 'no-answers') {
            filter.where.numberOfAnswers = 0;
        } else if (!orderMaps[showEditted]) {
            showEditted = 'recent-questions';
            redirectTo('/?show=recent-questions');
        }
        filter.order = orderMaps[showEditted];

        questionService.findAll(filter).then((result: Result) => {
            if (result.success) {
                const questionsEditted =
                    showEditted === show
                        ? [...questions, ...result.data]
                        : result.data;
                setQuestion(questionsEditted);
                setShow(showEditted);
            } else {
                // Todo: Handle error here
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
    getQuestions,
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

const MainPageImpl = connect(
    null,
    mapDispatchToProps
)(MainPage);
export default MainPageImpl;
