import { createReducer } from 'redux-starter-kit';

import {
    getQuestionRequest,
    getQuestionSuccess,
    getQuestionFailure,
    voteQuestionDetailRequest,
    voteQuestionDetailSuccess,
    voteQuestionDetailFailure,
    voteAnswerRequest,
    voteAnswerSuccess,
    voteAnswerFailure,
    createAnswerRequest,
    createAnswerSuccess,
    createAnswerFailure,
    approveAnswerSuccess
} from '../actions/questionDetail';

import { updateEntityVoted } from '../utils/update-voted';

const defaultState = {
    question: null,
    isFetching: false,
    isVotingQuestion: false,
    votingAnswerId: null,
    isCreatingAnswer: false,
    isFetchingError: false
};

function voteQuestionFn(state, action) {
    const { action: voteAction } = action.payload;
    const { question } = state;
    updateEntityVoted(question, voteAction);
    state.isVotingQuestion = false;
}

function voteAnswerFn(state, action) {
    const { action: voteAction, modelId } = action.payload;
    const { answers } = state.question;
    const answer = answers.find((answer) => answer.id === modelId);
    updateEntityVoted(answer, voteAction);
    state.votingAnswerId = null;
}

const questionDetailReducer = createReducer(defaultState, {
    [getQuestionRequest]: (state) => {
        state.isFetching = true;
    },
    [getQuestionSuccess]: (state, action) => {
        state.question = action.payload;
        state.isFetching = false;
    },
    [getQuestionFailure]: (state) => {
        state.isFetching = false;
    },
    [voteQuestionDetailRequest]: (state) => {
        state.isVotingQuestion = true;
    },
    [voteQuestionDetailSuccess]: voteQuestionFn,
    [voteQuestionDetailFailure]: (state) => {
        state.isVotingQuestion = false;
    },
    [voteAnswerRequest]: (state, action) => {
        state.votingAnswerId = action.payload;
    },
    [voteAnswerSuccess]: voteAnswerFn,
    [voteAnswerFailure]: (state) => {
        state.votingAnswerId = null;
    },
    [createAnswerRequest]: (state) => {
        state.isCreatingAnswer = true;
        state.isFetchingError = false;
    },
    [createAnswerSuccess]: (state) => {
        state.isCreatingAnswer = false;
    },
    [createAnswerFailure]: (state) => {
        state.isFetchingError = true;
        state.isCreatingAnswer = false;
    },
    [approveAnswerSuccess]: (state, action) => {
        state.question.bestAnswerItem = action.payload;
    }
});

export default questionDetailReducer;
