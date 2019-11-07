import { createReducer } from 'redux-starter-kit';

import {
    getExperiencesSuccess,
    createExperienceRequest,
    createExperienceSuccess,
    createExperienceFailure,
    editExperienceRequest,
    editExperienceSuccess,
    editExperienceFailure,
    getEducationsSuccess,
    createEducationRequest,
    createEducationSuccess,
    createEducationFailure,
    editEducationRequest,
    editEducationSuccess,
    editEducationFailure,
    getQuestionsAskedSuccess,
    getQuestionsAnsweredSuccess,
    getUserProfileSuccess
} from '../actions/userInfos';

const defaultState = {
    userProfile: null,
    experiences: {},
    educations: {},
    questionsAsked: {},
    questionsAnswered: {},
    isChangingEducation: false,
    isChangingExperience: false,
    isFetchingError : false,
};

const userInfosReducer = createReducer(defaultState, {
    [getUserProfileSuccess]: (state, action) => {
        state.userProfile = action.payload;
    },
    [getExperiencesSuccess]: (state, action) => {
        state.experiences = action.payload.entities.experiences || {} ;
    },
    [createExperienceRequest]: state => {
        state.isFetchingError = false;
        state.isChangingExperience = true;
    },
    [createExperienceSuccess]: (state, action) => {
        const {payload} = action;
        state.isChangingExperience = false;
        state.experiences[payload.id] = payload;
    },
    [createExperienceFailure]: state => {
        state.isFetchingError = true;
        state.isChangingExperience = false;
    },
    [editExperienceRequest]: state => {
        state.isFetchingError = false;
        state.isChangingExperience = true;
    },
    [editExperienceSuccess]: (state, action) => {
        state.isChangingExperience = false;
        const {payload} = action;
        state.experiences[payload.id] = payload;
    },
    [editExperienceFailure]: state => {
        state.isFetchingError = true;
        state.isChangingExperience = false;
    },
    [getEducationsSuccess]: (state, action) => {
        state.educations = action.payload.entities.educations || {};
    },
    [createEducationRequest]: state => {
        state.isFetchingError = false;
        state.isChangingEducation = true;
    },
    [createEducationSuccess]: (state, action) => {
        state.isChangingEducation = false;
        const {payload} = action;
        state.educations[payload.id] = payload;
    },
    [createEducationFailure]: state => {
        state.isFetchingError = true;
        state.isChangingEducation = false;
    },
    [editEducationRequest]: state => {
        state.isFetchingError = false;
        state.isChangingEducation = true;
    },
    [editEducationSuccess]: (state, action) => {
        state.isChangingEducation = false;
        const {payload} = action;
        state.educations[payload.id] = payload;
    },
    [editEducationFailure]: state => {
        state.isFetchingError = true;
        state.isChangingEducation = false;
    },
    [getQuestionsAskedSuccess]: (state, action) => {
        state.questionsAsked = action.payload.entities.questions || {} ;
    },
    [getQuestionsAnsweredSuccess]: (state, action) => {
        state.questionsAnswered = action.payload.entities.questions || {} ;
    }
});

export default userInfosReducer;
