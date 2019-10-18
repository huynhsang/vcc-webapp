import keyMirror from 'keymirror';

const actionNames = keyMirror({
    //Authentification
    SET_IS_AUTHENTICATED: null,
    SET_TO_AUTHENTICATE: null,

    //SWEET ALERT
    SHOW_ALERT: null,
    HIDE_ALERT: null,

    TOGGLE_MOBILE_ASIDE: null,

    TOGGLE_CONTACT_US: null,

    GET_CURRENT_USER_REQUEST: null,
    GET_CURRENT_USER_SUCCESS: null,
    GET_CURRENT_USER_FAILURE: null,

    UPDATE_CURRENT_USER_REQUEST: null,
    UPDATE_CURRENT_USER_SUCCESS: null,
    UPDATE_CURRENT_USER_FAILURE: null,

    SET_VERIFIED_USER: null
});

export default actionNames;
