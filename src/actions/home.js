import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

import { getUsers } from '../services/user.service';
import { getTrendingTags } from '../services/tags.service';
import { getQuestions } from '../services/question.service';

import { questionsFilterGenerator } from '../utils/question';

const {
    GET_TOP_USERS_REQUEST,
    GET_TOP_USERS_SUCCESS,
    GET_TOP_USERS_FAILURE,
    GET_POPULAR_QUESTIONS_REQUEST,
    GET_POPULAR_QUESTIONS_SUCCESS,
    GET_POPULAR_QUESTIONS_FAILURE,
    GET_QUESTIONS_TOP_ANSWERED_REQUEST,
    GET_QUESTIONS_TOP_ANSWERED_SUCCESS,
    GET_QUESTIONS_TOP_ANSWERED_FAILURE,
    GET_TRENDING_TAGS_REQUEST,
    GET_TRENDING_TAGS_SUCCESS,
    GET_TRENDING_TAGS_FAILURE
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
                limit: 5,
                where: {
                    realm: {
                        neq: 'admin_app'
                    },
                    emailVerified: true
                }
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

export const getQuestionsTopAnsweredRequest = createAction(
    GET_QUESTIONS_TOP_ANSWERED_REQUEST
);
export const getQuestionsTopAnsweredSuccess = createAction(
    GET_QUESTIONS_TOP_ANSWERED_SUCCESS
);
export const getQuestionsTopAnsweredFailure = createAction(
    GET_QUESTIONS_TOP_ANSWERED_FAILURE
);

export const getQuestionsTopAnsweredFn = () => {
    return dispatch => {
        dispatch(getQuestionsTopAnsweredRequest());
        const params = {
            filter: questionsFilterGenerator({ order: 'answerCount DESC' })
        };
        getQuestions(params)
            .then(data => {
                dispatch(getQuestionsTopAnsweredSuccess(data));
            })
            .catch(err => {
                console.log(err.message);
                dispatch(getQuestionsTopAnsweredFailure());
            });
    };
};

export const getTrendingTagsRequest = createAction(GET_TRENDING_TAGS_REQUEST);
export const getTrendingTagsSuccess = createAction(GET_TRENDING_TAGS_SUCCESS);
export const getTrendingTagsFailure = createAction(GET_TRENDING_TAGS_FAILURE);

export const getTrendingTagsFn = () => {
    return dispatch => {
        dispatch(getTrendingTagsRequest());
        const params = {
            filter: {
                skip: 0,
                limit: 5
            }
        };
        getTrendingTags(params)
            .then(data => {
                dispatch(getTrendingTagsSuccess(data));
            })
            .catch(err => {
                console.log(err);
                dispatch(getTrendingTagsFailure());
            });
    };
};
