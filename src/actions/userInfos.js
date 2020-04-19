import { createAction } from 'redux-starter-kit';
import i18n from 'i18next';
import actionsNames from '../constants/action-names.constant';

import {
    createExperience,
    getExperiences,
    editExperience
} from '../services/experience.service';
import {
    createEducation,
    getEducations,
    editEducation
} from '../services/education.service';
import { getQuestions } from '../services/question.service';
import { getUserProfile } from '../services/user.service';

import { errorAlertFn, successAlertFn } from './alertConfirm';

const DEFAULT_GET_LIMIT = 5;

const {
    GET_EXPERIENCES_SUCCESS,
    CREATE_EXPERIENCE_REQUEST,
    CREATE_EXPERIENCE_SUCCESS,
    CREATE_EXPERIENCE_FAILURE,
    EDIT_EXPERIENCE_REQUEST,
    EDIT_EXPERIENCE_SUCCESS,
    EDIT_EXPERIENCE_FAILURE,
    GET_EDUCATIONS_SUCCESS,
    CREATE_EDUCATION_REQUEST,
    CREATE_EDUCATION_SUCCESS,
    CREATE_EDUCATION_FAILURE,
    EDIT_EDUCATION_REQUEST,
    EDIT_EDUCATION_SUCCESS,
    EDIT_EDUCATION_FAILURE,
    GET_QUESTIONS_ASKED_SUCCESS,
    GET_USER_PROFILE_SUCCESS,
    GET_ANSWRED_QUESTIONS_SUCCESS
} = actionsNames;

export const getUserProfileSuccess = createAction(GET_USER_PROFILE_SUCCESS);

export const getUserProfileFn = (id) => {
    return (dispatch) => {
        getUserProfile(id)
            .then((data) => {
                dispatch(getUserProfileSuccess(data));
            })
            .catch((err) => console.log(err));
    };
};

export const getExperiencesSuccess = createAction(GET_EXPERIENCES_SUCCESS);

export const getExperiencesFn = (userId) => {
    return (dispatch) => {
        getExperiences({
            filter: {
                where: {
                    ownerId: userId
                }
            }
        })
            .then((data) => {
                dispatch(getExperiencesSuccess(data));
            })
            .catch((err) => console.log(err));
    };
};

export const createExperienceRequest = createAction(CREATE_EXPERIENCE_REQUEST);
export const createExperienceSuccess = createAction(CREATE_EXPERIENCE_SUCCESS);
export const createExperienceFailure = createAction(CREATE_EXPERIENCE_FAILURE);

export const createExperienceFn = (data) => {
    return (dispatch) => {
        dispatch(createExperienceRequest());
        createExperience(data)
            .then((responseData) => {
                dispatch(createExperienceSuccess(responseData));
                dispatch(
                    successAlertFn(i18n.t('user_info_experience_created'))
                );
            })
            .catch((err) => {
                dispatch(createExperienceFailure());
                dispatch(errorAlertFn(err.response.data.error.message));
            });
    };
};

export const editExperienceRequest = createAction(EDIT_EXPERIENCE_REQUEST);
export const editExperienceSuccess = createAction(EDIT_EXPERIENCE_SUCCESS);
export const editExperienceFailure = createAction(EDIT_EXPERIENCE_FAILURE);

export const editExperienceFn = (data) => {
    return (dispatch) => {
        dispatch(editExperienceRequest());
        editExperience(data)
            .then((responseData) => {
                dispatch(editExperienceSuccess(responseData));
                dispatch(
                    successAlertFn(i18n.t('user_info_experience_updated'))
                );
            })
            .catch((err) => {
                dispatch(editExperienceFailure());
                dispatch(errorAlertFn(err.response.data.error.message));
            });
    };
};

export const getEducationsSuccess = createAction(GET_EDUCATIONS_SUCCESS);

export const getEducationsFn = (userId) => {
    return (dispatch) => {
        getEducations({
            filter: {
                where: {
                    ownerId: userId
                }
            }
        })
            .then((data) => {
                dispatch(getEducationsSuccess(data));
            })
            .catch((err) => console.log(err));
    };
};

export const createEducationRequest = createAction(CREATE_EDUCATION_REQUEST);
export const createEducationSuccess = createAction(CREATE_EDUCATION_SUCCESS);
export const createEducationFailure = createAction(CREATE_EDUCATION_FAILURE);

export const createEducationFn = (data) => {
    return (dispatch) => {
        dispatch(createEducationRequest());
        createEducation(data)
            .then((responseData) => {
                dispatch(createEducationSuccess(responseData));
                dispatch(successAlertFn(i18n.t('user_info_education_created')));
            })
            .catch((err) => {
                dispatch(createEducationFailure());
                dispatch(errorAlertFn(err.response.data.error.message));
            });
    };
};

export const editEducationRequest = createAction(EDIT_EDUCATION_REQUEST);
export const editEducationSuccess = createAction(EDIT_EDUCATION_SUCCESS);
export const editEducationFailure = createAction(EDIT_EDUCATION_FAILURE);

export const editEducationFn = (data) => {
    return (dispatch) => {
        dispatch(editEducationRequest());
        editEducation(data)
            .then((responseData) => {
                dispatch(editEducationSuccess(responseData));
                dispatch(successAlertFn(i18n.t('user_info_education_updated')));
            })
            .catch((err) => {
                dispatch(editEducationFailure());
                dispatch(errorAlertFn(err.response.data.error.message));
            });
    };
};

export const getQuestionsAskedSuccess = createAction(
    GET_QUESTIONS_ASKED_SUCCESS
);

export const getQuestionsAskedFn = (userId, page = 1) => {
    const filter = {
        ownerId: userId,
        order: ['modified DESC', 'created DESC'],
        limit: DEFAULT_GET_LIMIT,
        skip: (page - 1) * DEFAULT_GET_LIMIT
    };
    return (dispatch) => {
        getQuestions({ filter, totalCount: true })
            .then((data) => {
                dispatch(getQuestionsAskedSuccess(data));
            })
            .catch((err) => console.log(err));
    };
};

export const getAnsweredQuestionsSuccess = createAction(
    GET_ANSWRED_QUESTIONS_SUCCESS
);

export const getAnsweredQuestionsFn = (userId, page = 1) => {
    const filter = {
        respondentId: userId,
        order: ['modified DESC', 'created DESC'],
        limit: DEFAULT_GET_LIMIT,
        skip: (page - 1) * DEFAULT_GET_LIMIT
    };

    return (dispatch) => {
        getQuestions({ filter, totalCount: true })
            .then((data) => {
                dispatch(getAnsweredQuestionsSuccess(data));
            })
            .catch((err) => console.log(err));
    };
};
