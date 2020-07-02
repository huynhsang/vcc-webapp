import { createReducer } from 'redux-starter-kit';

import {
    getQuestionSuccess,
    voteQuestionDetailSuccess,
    voteAnswerSuccess,
    createAnswerSuccess,
    approveAnswerSuccess,
    editAnswerSuccess,
    setQuestionPageLoading,
    removeAnswerSuccess
} from '../actions/questionDetail';

import { updateEntityVoted } from '../utils/update-voted';

const defaultState = {
    question: null,
    isLoading: false
};

function voteQuestionFn(state, action) {
    const { action: voteAction } = action.payload;
    const { question } = state;
    updateEntityVoted(question, voteAction);
}

function voteAnswerFn(state, action) {
    const { action: voteAction, modelId } = action.payload;
    const { answers } = state.question;
    const answer = answers.find((answer) => answer.id === modelId);
    updateEntityVoted(answer, voteAction);
}

const questionDetailReducer = createReducer(defaultState, {
    [setQuestionPageLoading]: (state, action) => {
        state.isLoading = action.payload;
    },
    [getQuestionSuccess]: (state, action) => {
        state.question = action.payload;
        state.isLoading = false;
    },
    [voteQuestionDetailSuccess]: voteQuestionFn,
    [voteAnswerSuccess]: voteAnswerFn,
    [createAnswerSuccess]: (state) => {
        state.isCreatingAnswer = false;
    },
    [approveAnswerSuccess]: (state, action) => {
        state.question.bestAnswerItem = action.payload;
    },
    [editAnswerSuccess]: (state, action) => {
        const { payload } = action;
        const answerFound = state.question.answers.find(
            (val) => val.id === payload.id
        );
        if (answerFound) {
            answerFound.body = payload.body;
        }
    },
    [removeAnswerSuccess]: (state, action) => {
        const { question } = state;
        question.answers = question.answers.filter(
            (val) => val.id !== action.payload
        );
        question.answerCount -= 1;
    }
});

export default questionDetailReducer;
