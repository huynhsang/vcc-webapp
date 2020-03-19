import keyMirror from 'keymirror';

const actionNames = keyMirror({
    //Authentification
    SET_IS_AUTHENTICATED: null,
    SET_TO_AUTHENTICATE: null,

    //SWEET ALERT
    SHOW_ALERT: null,
    HIDE_ALERT: null,

    //Alert confirm
    SHOW_LOGIN_CONFIRM: null,
    SET_ALERT_SNACKBAR: null,

    //
    TOGGLE_MOBILE_ASIDE: null,
    TOGGLE_CONTACT_US: null,

    //APP
    GET_CURRENT_USER_REQUEST: null,
    GET_CURRENT_USER_SUCCESS: null,
    GET_CURRENT_USER_FAILURE: null,
    UPDATE_CURRENT_USER_REQUEST: null,
    UPDATE_CURRENT_USER_SUCCESS: null,
    UPDATE_CURRENT_USER_FAILURE: null,

    SET_VERIFIED_USER: null,

    GET_USER_BY_LOGIN_TOKEN_SUCCESS: null,

    //HOME
    GET_TOP_USERS_REQUEST: null,
    GET_TOP_USERS_SUCCESS: null,
    GET_TOP_USERS_FAILURE: null,
    GET_POPULAR_QUESTIONS_REQUEST: null,
    GET_POPULAR_QUESTIONS_SUCCESS: null,
    GET_POPULAR_QUESTIONS_FAILURE: null,
    GET_QUESTIONS_TOP_ANSWERED_REQUEST: null,
    GET_QUESTIONS_TOP_ANSWERED_SUCCESS: null,
    GET_QUESTIONS_TOP_ANSWERED_FAILURE: null,
    GET_TRENDING_TAGS_REQUEST: null,
    GET_TRENDING_TAGS_SUCCESS: null,
    GET_TRENDING_TAGS_FAILURE: null,

    //Questions
    GET_QUESTIONS_REQUEST: null,
    GET_QUESTIONS_SUCCESS: null,
    GET_QUESTIONS_FAILURE: null,
    VOTE_QUESTION_REQUEST: null,
    VOTE_QUESTION_SUCCESS: null,
    VOTE_QUESTION_FAILURE: null,

    //Question
    GET_QUESTION_REQUEST: null,
    GET_QUESTION_SUCCESS: null,
    GET_QUESTION_FAILURE: null,
    VOTE_QUESTION_DETAIL_REQUEST: null,
    VOTE_QUESTION_DETAIL_SUCCESS: null,
    VOTE_QUESTION_DETAIL_FAILURE: null,
    VOTE_ANSWER_REQUEST: null,
    VOTE_ANSWER_SUCCESS: null,
    VOTE_ANSWER_FAILURE: null,
    CREATE_ANSWER_REQUEST: null,
    CREATE_ANSWER_SUCCESS: null,
    CREATE_ANSWER_FAILURE: null,
    APPROVE_ANSWER_SUCCESS: null,

    //User Infos,
    GET_EXPERIENCES_SUCCESS: null,
    CREATE_EXPERIENCE_REQUEST: null,
    CREATE_EXPERIENCE_SUCCESS: null,
    CREATE_EXPERIENCE_FAILURE: null,
    EDIT_EXPERIENCE_REQUEST: null,
    EDIT_EXPERIENCE_SUCCESS: null,
    EDIT_EXPERIENCE_FAILURE: null,
    GET_EDUCATIONS_SUCCESS: null,
    CREATE_EDUCATION_REQUEST: null,
    CREATE_EDUCATION_SUCCESS: null,
    CREATE_EDUCATION_FAILURE: null,
    EDIT_EDUCATION_REQUEST: null,
    EDIT_EDUCATION_SUCCESS: null,
    EDIT_EDUCATION_FAILURE: null,
    GET_QUESTIONS_ASKED_SUCCESS: null,
    GET_ANSWERS_RELATED_SUCCESS: null,
    GET_USER_PROFILE_SUCCESS: null,
    GET_NUMBER_ANSWERS_RELATED_SUCCESS: null,
});

export default actionNames;
