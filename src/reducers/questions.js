import { createReducer } from 'redux-starter-kit';
import {updateEntityVoted} from '../utils/update-voted';

import {
    getQuestionsRequest,
    getQuestionsSuccess,
    getQuestionsFailure,
    voteQuestionRequest,
    voteQuestionSuccess,
    voteQuestionFailure
} from '../actions/questions';

const defaultState = {
    questions: {},
    isFetching: false,
    votingQuestionId: null,
    numberQuestions: 0
};

function voteQuestionFn(state, action) {
    const { action: voteAction, modelId } = action.payload;
    const question = state.questions[modelId];
    updateEntityVoted(question, voteAction);
    state.votingQuestionId = null;
}

const questionsReducer = createReducer(defaultState, {
    [getQuestionsRequest]: state => {
        state.isFetching = true;
    },
    [getQuestionsSuccess]: (state, action) => {
        state.isFetching = false;
        state.questions =
            action.payload && action.payload.entities
                ? action.payload.entities.questions || {}
                : {};
        state.numberQuestions = action.payload.count;
    },
    [getQuestionsFailure]: state => {
        state.isFetching = false;
    },
    [voteQuestionRequest]: (state, action) => {
        state.votingQuestionId = action.payload;
    },
    [voteQuestionSuccess]: voteQuestionFn,
    [voteQuestionFailure]: state => {
        state.votingQuestionId = null;
    }
});

export default questionsReducer;
