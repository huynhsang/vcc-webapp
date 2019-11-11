import { createReducer } from 'redux-starter-kit';

import {
    getQuestionsRequest,
    getQuestionsSuccess,
    getQuestionsFailure,
    voteQuestionRequest,
    voteQuestionSuccess,
    voteQuestionFailure,
    getNumberQuestionsSuccess
} from '../actions/questions';

const defaultState = {
    questions: {},
    isFetching: false,
    votingQuestionId: null,
    numberQuestions: 0
};

function voteQuestionFn(state, action) {
    const { payload } = action;
    const { model } = payload;
    delete payload.model;

    const question = state.questions[model.id];
    const lastVote = (question.votes || []).find(
        vote => vote.id === payload.id
    );

    if (payload.action === 'up') {
        question.upVoteCount = model.upVoteCount + 1;
        if (lastVote) {
            question.downVoteCount = model.downVoteCount - 1;
        }
    } else if (payload.action === 'down') {
        question.downVoteCount = model.downVoteCount + 1;
        if (lastVote) {
            question.upVoteCount = model.upVoteCount - 1;
        }
    }

    question.votes = [payload];
    state.votingQuestionId = null;
}

const questionsReducer = createReducer(defaultState, {
    [getQuestionsRequest]: state => {
        state.isFetching = true;
    },
    [getQuestionsSuccess]: (state, action) => {
        state.isFetching = false;
        const { questions } = action.payload.entities;
        state.questions = questions;
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
    },
    [getNumberQuestionsSuccess]: (state, action) => {
        state.numberQuestions = action.payload.count;
    }
});

export default questionsReducer;
