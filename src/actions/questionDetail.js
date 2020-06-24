import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';
import i18n from 'i18next';
import {
    getQuestionWithSlug,
    voteQuestion,
    approveAnswer,
    deleteAnswer
} from '../services/question.service';

import {
    voteAnswer,
    createAnswer,
    editAnswer
} from '../services/answer.service';

import { errorAlertFn, successAlertFn } from './alertConfirm';

const {
    GET_QUESTION_SUCCESS,
    VOTE_QUESTION_DETAIL_SUCCESS,
    VOTE_ANSWER_SUCCESS,
    CREATE_ANSWER_SUCCESS,
    APPROVE_ANSWER_SUCCESS,
    EDIT_ANSWER_SUCCESS,
    SET_QUESTION_PAGE_LOADING,
    REMOVE_ANSWER_SUCCESS
} = actionsNames;

export const setQuestionPageLoading = createAction(SET_QUESTION_PAGE_LOADING);

export const getQuestionSuccess = createAction(GET_QUESTION_SUCCESS);
export const getQuestionFn = (slug, setLoading = true) => {
    return (dispatch) => {
        if(setLoading){
            dispatch(setQuestionPageLoading(true));
        }
        getQuestionWithSlug(slug)
            .then((data) => {
                dispatch(getQuestionSuccess(data));
            })
            .catch((err) => {
                dispatch(setQuestionPageLoading(false));
                console.log(err.message);
            });
    };
};

export const voteQuestionDetailSuccess = createAction(
    VOTE_QUESTION_DETAIL_SUCCESS
);
export const voteQuestionFn = (questionId, action) => {
    return (dispatch) => {
        voteQuestion(questionId, action)
            .then((data) => {
                dispatch(voteQuestionDetailSuccess(data));
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
};

export const voteAnswerSuccess = createAction(VOTE_ANSWER_SUCCESS);
export const voteAnswerFn = (answerId, action) => {
    return (dispatch) => {
        voteAnswer(answerId, action)
            .then((data) => {
                dispatch(voteAnswerSuccess(data));
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
};

export const createAnswerSuccess = createAction(CREATE_ANSWER_SUCCESS);
export const createAnswerFn = (questionId, answerBody) => {
    return (dispatch, getState) => {
        createAnswer(questionId, answerBody)
            .then(() => {
                dispatch(successAlertFn(i18n.t('question_leaved_an_answer')));
                dispatch(createAnswerSuccess());
                const {
                    questionDetail: {
                        question: { slug }
                    }
                } = getState();
                dispatch(getQuestionFn(slug, false));
            })
            .catch((err) => {
                errorAlertFn(err.response.data.error.message);
            });
    };
};

export const approveAnswerSuccess = createAction(APPROVE_ANSWER_SUCCESS);
export const approveAnswerFn = (questionId, answerId) => {
    return (dispatch) => {
        approveAnswer(questionId, answerId)
            .then((data) => {
                dispatch(
                    successAlertFn(i18n.t('question_approved_this_answer'))
                );
                dispatch(approveAnswerSuccess(data));
            })
            .catch((err) => {
                errorAlertFn(err.response.data.error.message);
            });
    };
};

export const removeAnswerSuccess = createAction(REMOVE_ANSWER_SUCCESS);
export const removeAnswerFn = (id) => {
    return (dispatch) => {
        deleteAnswer(id)
            .then(() => {
                dispatch(removeAnswerSuccess(id));
                dispatch(
                    successAlertFn(i18n.t('question_remove_answer_success'))
                );
            })
            .catch((err) => {
                errorAlertFn(err.response.data.error.message);
            });
    };
};

export const editAnswerSuccess = createAction(EDIT_ANSWER_SUCCESS);
export const editAnswerFn = (data) => {
    return (dispatch) => {
        editAnswer(data)
            .then((responseData) => {
                dispatch(editAnswerSuccess(responseData));
                dispatch(
                    successAlertFn(i18n.t('question_edit_answer_success'))
                );
            })
            .catch((err) => {
                errorAlertFn(err.response.data.error.message);
            });
    };
};
