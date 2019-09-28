import React from 'react';
import { connect } from 'react-redux';
import {
    getCurrentUser,
    updateApplicationAfterAuthenticated
} from '../../common/util/AccountUtil';
import ApplicationUtil from '../../common/util/ApplicationUtil';

import { showSuccessAlertFn, showErrorAlertFn } from '../../actions/sweetAlert';

import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';

import {
    setToLoginFn,
    setToAuthenticateFn,
    setToRegistreFn,
    setToFindPasswordFn
} from '../../actions/appAuth';

const Authentication = ({
    location,
    history,
    toAuthenticate,
    setToLogin,
    setToFindPassword,
    setToRegistre,
    updateAuthenticated,
    setToAuthenticate,
    showSuccessAlert,
    showErrorAlert
}) => {
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (isMounted) {
            setToAuthenticate('');
        }
    }, [location.pathname]);

    return (
        <div className="bg-unauthenticated register-page">
            {toAuthenticate === 'login' && (
                <Login
                    history={history}
                    updateAuthenticated={updateAuthenticated}
                    showSuccessAlert={showSuccessAlert}
                    showErrorAlert={showErrorAlert}
                    setToFindPassword={setToFindPassword}
                    setToRegistre={setToRegistre}
                />
            )}
            {toAuthenticate === 'registre' && (
                <Registration
                    history={history}
                    showSuccessAlert={showSuccessAlert}
                    showErrorAlert={showErrorAlert}
                    setToLogin={setToLogin}
                />
            )}
            {toAuthenticate === 'find-password' && (
                <ForgotPassword setToLogin={setToLogin} />
            )}
        </div>
    );
};

const mapDispatchToProp = dispatch => ({
    setToLogin: () => dispatch(setToLoginFn()),
    setToFindPassword: val => dispatch(setToFindPasswordFn(val)),
    setToRegistre: () => dispatch(setToRegistreFn()),
    setToAuthenticate: () => dispatch(setToAuthenticateFn()),
    showSuccessAlert: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    showErrorAlert: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    updateAuthenticated: () => dispatch(updateApplicationAfterAuthenticated())
});

export default connect(
    null,
    mapDispatchToProp
)(Authentication);
