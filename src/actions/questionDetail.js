import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';
import {
    getQuestionWithSlug,
    voteQuestion,
    reVoteQuestion
} from '../services/question.service';

import {
    voteAnswer,
    reVoteAnswer,
    createAnswer
} from '../services/answer.service';

import { showSuccessAlertFn, showErrorAlertFn } from './sweetAlert';

const {
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS,
    GET_QUESTION_FAILURE,
    VOTE_QUESTION_DETAIL_REQUEST,
    VOTE_QUESTION_DETAIL_SUCCESS,
    VOTE_QUESTION_DETAIL_FAILURE,
    VOTE_ANSWER_REQUEST,
    VOTE_ANSWER_SUCCESS,
    VOTE_ANSWER_FAILURE,
    CREATE_ANSWER_REQUEST,
    CREATE_ANSWER_SUCCESS,
    CREATE_ANSWER_FAILURE
} = actionsNames;

export const getQuestionRequest = createAction(GET_QUESTION_REQUEST);
export const getQuestionSuccess = createAction(GET_QUESTION_SUCCESS);
export const getQuestionFailure = createAction(GET_QUESTION_FAILURE);

export const getQuestionFn = slug => {
    return dispatch => {
        dispatch(getQuestionRequest());
        getQuestionWithSlug(slug)
            .then(data => {
                dispatch(getQuestionSuccess(data));
            })
            .catch(err => {
                dispatch(getQuestionFailure());
                console.log(err.message);
            });
    };
};

export const voteQuestionDetailRequest = createAction(
    VOTE_QUESTION_DETAIL_REQUEST
);
export const voteQuestionDetailSuccess = createAction(
    VOTE_QUESTION_DETAIL_SUCCESS
);
export const voteQuestionDetailFailure = createAction(
    VOTE_QUESTION_DETAIL_FAILURE
);

export const voteQuestionFn = (questionId, action) => {
    return dispatch => {
        dispatch(voteQuestionDetailRequest());
        voteQuestion(questionId, action)
            .then(data => {
                dispatch(voteQuestionDetailSuccess(data));
            })
            .catch(err => {
                dispatch(voteQuestionDetailFailure());
                console.log(err.message);
            });
    };
};

export const reVoteQuestionFn = (questionId, voteId, action) => {
    return dispatch => {
        dispatch(voteQuestionDetailRequest());
        reVoteQuestion(questionId, voteId, action)
            .then(data => {
                dispatch(voteQuestionDetailSuccess(data));
            })
            .catch(err => {
                dispatch(voteQuestionDetailFailure());
                console.log(err.message);
            });
    };
};

export const voteAnswerRequest = createAction(VOTE_ANSWER_REQUEST);
export const voteAnswerSuccess = createAction(VOTE_ANSWER_SUCCESS);
export const voteAnswerFailure = createAction(VOTE_ANSWER_FAILURE);

export const voteAnswerFn = (answerId, action) => {
    return dispatch => {
        dispatch(voteAnswerRequest(answerId));
        voteAnswer(answerId, action)
            .then(data => {
                dispatch(voteAnswerSuccess(data));
            })
            .catch(err => {
                dispatch(voteAnswerFailure());
                console.log(err.message);
            });
    };
};

export const reVoteAnswerFn = (answerId, voteId, action) => {
    return dispatch => {
        dispatch(voteAnswerRequest(answerId));
        reVoteAnswer(answerId, voteId, action)
            .then(data => {
                dispatch(voteAnswerSuccess(data));
            })
            .catch(err => {
                dispatch(voteAnswerFailure());
                console.log(err.message);
            });
    };
};

export const createAnswerRequest = createAction(CREATE_ANSWER_REQUEST);
export const createAnswerSuccess = createAction(CREATE_ANSWER_SUCCESS);
export const createAnswerFailure = createAction(CREATE_ANSWER_FAILURE);

export const createAnswerFn = (questionId, answerBody) => {
    return dispatch => {
        dispatch(createAnswerRequest());
        createAnswer(questionId, answerBody)
            .then(() => {
                dispatch(showSuccessAlertFn('Success!', 'Leaved an answer'));
                dispatch(createAnswerSuccess());
            })
            .catch(err => {
                showErrorAlertFn('Error!', err.response.data.error.message);
                dispatch(createAnswerFailure());
                console.log(err.message);
            });
    };
};
