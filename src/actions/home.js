import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { getUsers } from '../services/user.service';
import { getQuestions } from '../services/question.service';

import { questionsFilterGenerator } from '../utils/question';

const {
    GET_TOP_USERS_REQUEST,
    GET_TOP_USERS_SUCCESS,
    GET_TOP_USERS_FAILURE,
    GET_POPULAR_QUESTIONS_REQUEST,
    GET_POPULAR_QUESTIONS_SUCCESS,
    GET_POPULAR_QUESTIONS_FAILURE,
} = actionsNames;

export const getTopUsersRequest = createAction(GET_TOP_USERS_REQUEST);
export const getTopUsersSuccess = createAction(GET_TOP_USERS_SUCCESS);
export const getTopUsersFailure = createAction(GET_TOP_USERS_FAILURE);

export const getTopUsersFn = () => {
    return dispatch => {
        dispatch(getTopUsersRequest());
        const params = {
            filter: {
                skip: 0,
                limit: 10
            }
        };
        getUsers(params)
            .then(data => {
                dispatch(getTopUsersSuccess(data));
            })
            .catch(err => {
                dispatch(getTopUsersFailure());
                console.log(err.message);
            });
    };
};

export const getPopularQuestionsRequest = createAction(
    GET_POPULAR_QUESTIONS_REQUEST
);
export const getPopularQuestionsSuccess = createAction(
    GET_POPULAR_QUESTIONS_SUCCESS
);
export const getPopularQuestionsFailure = createAction(
    GET_POPULAR_QUESTIONS_FAILURE
);

export const getPopularQuestionsFn = () => {
    return dispatch => {
        dispatch(getPopularQuestionsRequest());
        const params = {
            filter: questionsFilterGenerator({ order: 'viewCount DESC' })
        };
        getQuestions(params)
            .then(data => {
                dispatch(getPopularQuestionsSuccess(data));
            })
            .catch(err => {
                console.log(err.message);
                dispatch(getPopularQuestionsFailure());
            });
    };
};