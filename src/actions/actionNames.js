import keyMirror from 'keymirror';

const actionNames = keyMirror({
    //Authentification
    IS_AUTHENTICATED: null,
    FAILED_AUTHENTICATION: null,

    //SWEET ALERT
    SHOW_ALERT: null,
    HIDE_ALERT: null,
});

export default actionNames;
