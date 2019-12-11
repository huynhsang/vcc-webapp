import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { getQuestions, voteQuestion } from '../services/question.service';

const {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
    VOTE_QUESTION_REQUEST,
    VOTE_QUESTION_SUCCESS,
    VOTE_QUESTION_FAILURE
} = actionsNames;

export const getQuestionsRequest = createAction(GET_QUESTIONS_REQUEST);
export const getQuestionsSuccess = createAction(GET_QUESTIONS_SUCCESS);
export const getQuestionsFailure = createAction(GET_QUESTIONS_FAILURE);

export const getQuestionsFn = params => {
    return dispatch => {
        dispatch(getQuestionsRequest());
        getQuestions(params)
            .then(data => {
                dispatch(getQuestionsSuccess(data));
            })
            .catch(err => {
                dispatch(getQuestionsSuccess());
                console.log(err.message);
            });
    };
};

export const voteQuestionRequest = createAction(VOTE_QUESTION_REQUEST);
export const voteQuestionSuccess = createAction(VOTE_QUESTION_SUCCESS);
export const voteQuestionFailure = createAction(VOTE_QUESTION_FAILURE);

export const voteQuestionFn = (questionId, action) => {
    return dispatch => {
        dispatch(voteQuestionRequest(questionId));
        voteQuestion(questionId, action)
            .then((data) => {
                dispatch(
                    voteQuestionSuccess(data)
                );
            })
            .catch(err => {
                dispatch(voteQuestionFailure());
                console.log(err.message);
            });
    };
};
