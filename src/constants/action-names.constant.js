import keyMirror from 'keymirror';

const actionNames = keyMirror({
    //Authentification
    SET_IS_AUTHENTICATED: null,
    SET_TO_AUTHENTICATE: null,

    //SWEET ALERT
    SHOW_ALERT: null,
    HIDE_ALERT: null,

    TOGGLE_MOBILE_ASIDE: null,

    TOGGLE_CONTACT_US: null
});

export default actionNames;
