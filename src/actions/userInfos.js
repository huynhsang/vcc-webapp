import { createAction } from 'redux-starter-kit';
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
import { getQuestions, getNumberQuestions } from '../services/question.service';
import { getAnswers, getNumberAnswers } from '../services/answer.service';
import { getUser } from '../services/user.service';

import { showSuccessAlertFn, showErrorAlertFn } from './sweetAlert';

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
    GET_ANSWERS_RELATED_SUCCESS,
    GET_USER_PROFILE_SUCCESS,
    GET_NUMBER_ANSWERS_RELATED_SUCCESS,
    GET_NUMBER_QUESTIONS_ASKED_SUCCESS
} = actionsNames;

export const getUserProfileSuccess = createAction(GET_USER_PROFILE_SUCCESS);

export const getUserProfileFn = id => {
    return dispatch => {
        getUser(id)
            .then(data => {
                dispatch(getUserProfileSuccess(data));
            })
            .catch(err => console.log(err));
    };
};

export const getExperiencesSuccess = createAction(GET_EXPERIENCES_SUCCESS);

export const getExperiencesFn = userId => {
    return dispatch => {
        getExperiences({
            filter: {
                where: {
                    ownerId: userId
                }
            }
        })
            .then(data => {
                dispatch(getExperiencesSuccess(data));
            })
            .catch(err => console.log(err));
    };
};

export const createExperienceRequest = createAction(CREATE_EXPERIENCE_REQUEST);
export const createExperienceSuccess = createAction(CREATE_EXPERIENCE_SUCCESS);
export const createExperienceFailure = createAction(CREATE_EXPERIENCE_FAILURE);

export const createExperienceFn = data => {
    return dispatch => {
        dispatch(createExperienceRequest());
        createExperience(data)
            .then(responseData => {
                dispatch(createExperienceSuccess(responseData));
                dispatch(showSuccessAlertFn('Success!', 'Experience created!'));
            })
            .catch(err => {
                dispatch(createExperienceFailure());
                dispatch(
                    showErrorAlertFn('Error!', err.response.data.error.message)
                );
            });
    };
};

export const editExperienceRequest = createAction(EDIT_EXPERIENCE_REQUEST);
export const editExperienceSuccess = createAction(EDIT_EXPERIENCE_SUCCESS);
export const editExperienceFailure = createAction(EDIT_EXPERIENCE_FAILURE);

export const editExperienceFn = data => {
    return dispatch => {
        dispatch(editExperienceRequest());
        editExperience(data)
            .then(responseData => {
                dispatch(editExperienceSuccess(responseData));
                dispatch(showSuccessAlertFn('Success!', 'Experience updated!'));
            })
            .catch(err => {
                dispatch(editExperienceFailure());
                dispatch(
                    showErrorAlertFn('Error!', err.response.data.error.message)
                );
            });
    };
};

export const getEducationsSuccess = createAction(GET_EDUCATIONS_SUCCESS);

export const getEducationsFn = userId => {
    return dispatch => {
        getEducations({
            filter: {
                where: {
                    ownerId: userId
                }
            }
        })
            .then(data => {
                dispatch(getEducationsSuccess(data));
            })
            .catch(err => console.log(err));
    };
};

export const createEducationRequest = createAction(CREATE_EDUCATION_REQUEST);
export const createEducationSuccess = createAction(CREATE_EDUCATION_SUCCESS);
export const createEducationFailure = createAction(CREATE_EDUCATION_FAILURE);

export const createEducationFn = data => {
    return dispatch => {
        dispatch(createEducationRequest());
        createEducation(data)
            .then(responseData => {
                dispatch(createEducationSuccess(responseData));
                dispatch(showSuccessAlertFn('Success!', 'Education created!'));
            })
            .catch(err => {
                dispatch(createEducationFailure());
                dispatch(
                    showErrorAlertFn('Error!', err.response.data.error.message)
                );
            });
    };
};

export const editEducationRequest = createAction(EDIT_EDUCATION_REQUEST);
export const editEducationSuccess = createAction(EDIT_EDUCATION_SUCCESS);
export const editEducationFailure = createAction(EDIT_EDUCATION_FAILURE);

export const editEducationFn = data => {
    return dispatch => {
        dispatch(editEducationRequest());
        editEducation(data)
            .then(responseData => {
                dispatch(editEducationSuccess(responseData));
                dispatch(showSuccessAlertFn('Success!', 'Experience updated!'));
            })
            .catch(err => {
                dispatch(editEducationFailure());
                dispatch(
                    showErrorAlertFn('Error!', err.response.data.error.message)
                );
            });
    };
};

export const getQuestionsAskedSuccess = createAction(
    GET_QUESTIONS_ASKED_SUCCESS
);

export const getNumberQuestionsAskedSuccess = createAction(
    GET_NUMBER_QUESTIONS_ASKED_SUCCESS
);

export const getQuestionsAskedFn = (userId, page = 1) => {
    const where = {
        ownerId: userId
    };
    const filter = {
        where,
        order: ['modified DESC', 'created DESC'],
        limit: DEFAULT_GET_LIMIT,
        skip: (page - 1) * DEFAULT_GET_LIMIT
    };
    return dispatch => {
        getQuestions({ filter })
            .then(data => {
                dispatch(getQuestionsAskedSuccess(data));
            })
            .catch(err => console.log(err));

        getNumberQuestions({ where })
            .then(data => {
                dispatch(getNumberQuestionsAskedSuccess(data));
            })
            .catch(err => console.log(err));
    };
};

export const getAnswersRelatedSuccess = createAction(
    GET_ANSWERS_RELATED_SUCCESS
);

export const getNumberAnswersRelatedSuccess = createAction(
    GET_NUMBER_ANSWERS_RELATED_SUCCESS
);

export const getAnswersRelatedFn = userId => {
    const where = {
        ownerId: userId
    };
    const filter = {
        where,
        include: [
            {
                relation: 'question',
                scope: {
                    include: {
                        relation: 'askedBy',
                        scope: {
                            fields: [
                                'id',
                                'avatar',
                                'firstName',
                                'lastName',
                                'points'
                            ]
                        }
                    }
                }
            }
        ],
        order: ['modified DESC', 'created DESC']
    };

    return dispatch => {
        getAnswers({ filter })
            .then(data => {
                dispatch(getAnswersRelatedSuccess(data));
            })
            .catch(err => console.log(err));

        getNumberAnswers({ where })
            .then(data => {
                dispatch(getNumberAnswersRelatedSuccess(data));
            })
            .catch(err => console.log(err));
    };
};
