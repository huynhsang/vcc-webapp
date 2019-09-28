import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
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

const BackgroundImage = require('../../static/resources/img/bg.jpg');

const dialogStyle = {
    width: '95%',
    maxWidth: '450px'
};

const Authentication = ({
    location,
    history,
    setToLogin,
    setToFindPassword,
    setToRegistre,
    updateAuthenticated,
    setToAuthenticate,
    showSuccessAlert,
    showErrorAlert,
    AppAuth,
    className
}) => {
    const { t } = useTranslation();

    const [isMounted, setIsMounted] = React.useState(false);

    const { isAuthenticated, toAuthenticate } = AppAuth;

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (isMounted) {
            setToAuthenticate('');
        }
    }, [location.pathname]);

    const headerTitle = () => {
        switch (toAuthenticate) {
            case 'login':
                return 'common_login';
            case 'registre':
                return 'common_registre';
            case 'find-password':
                return 'common_forgot_password';
            default:
                return '';
        }
    };

    return (
        <div className={className}>
            <Dialog
                header={t(headerTitle())}
                visible={Boolean(toAuthenticate)}
                style={dialogStyle}
                modal={true}
                onHide={() => setToAuthenticate('')}
            >
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
            </Dialog>
        </div>
    );
};

const AuthenticationStyled = styled(Authentication)`
    .p-dialog .p-dialog-content {
        padding: 0 !important;
        background: url('${BackgroundImage}') center center / 100% 100% no-repeat;
        width: 100%;
        padding: 30px 15px;
        color: #a8a8a8;

        & form{
            color:white;
        }

        & input {
            border : none;
        }
    }
`;

const mapStateToProp = ({ AppAuth }) => ({
    AppAuth
});

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
    mapStateToProp,
    mapDispatchToProp
)(withRouter(AuthenticationStyled));
