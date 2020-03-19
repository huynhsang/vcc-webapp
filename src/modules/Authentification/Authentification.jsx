import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { errorAlertFn, successAlertFn } from '../../actions/alertConfirm';

import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';

import {
    setToLoginFn,
    setToAuthenticateFn,
    setToRegistreFn,
    setToFindPasswordFn,
    fetchUserFromCookieFn
} from '../../actions/app';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            background: '#fdfdfd',
            '@media (max-width: 768px)': {
                margin: '10px'
            }
        }
    },
    title: {
        paddingBottom: 0,
        '& > h2': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    },
    content: {
        paddingBottom: 20,
        '@media (max-width: 768px)': {
            padding: '8px 12px'
        }
    }
}));

const Authentication = ({
    location,
    history,
    setToLogin,
    setToFindPassword,
    setToRegistre,
    setToAuthenticate,
    successAlert,
    errorAlert,
    App,
    fetchUserFromCookie
}) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [isMounted, setIsMounted] = React.useState(false);

    const { toAuthenticate } = App;

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (isMounted) {
            setToAuthenticate('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const hideAuthentification = () => setToAuthenticate('');

    return (
        <Dialog
            className={classes.dialog}
            open={Boolean(toAuthenticate)}
            onClose={hideAuthentification}
        >
            <DialogTitle className={classes.title}>
                <div>{t(headerTitle())}</div>
                <IconButton onClick={hideAuthentification}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {toAuthenticate === 'login' && (
                    <Login
                        successAlert={successAlert}
                        errorAlert={errorAlert}
                        setToFindPassword={setToFindPassword}
                        setToRegistre={setToRegistre}
                        hideAuthentification={hideAuthentification}
                        fetchUserFromCookie={fetchUserFromCookie}
                    />
                )}
                {toAuthenticate === 'registre' && (
                    <Registration
                        history={history}
                        successAlert={successAlert}
                        errorAlert={errorAlert}
                        setToLogin={setToLogin}
                        hideAuthentification={hideAuthentification}
                    />
                )}
                {toAuthenticate === 'find-password' && (
                    <ForgotPassword
                        setToLogin={setToLogin}
                        history={history}
                        successAlert={successAlert}
                        errorAlert={errorAlert}
                        hideAuthentification={hideAuthentification}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

const mapStateToProp = ({ App }) => ({
    App
});

const mapDispatchToProp = dispatch => ({
    setToLogin: () => dispatch(setToLoginFn()),
    setToFindPassword: val => dispatch(setToFindPasswordFn(val)),
    setToRegistre: () => dispatch(setToRegistreFn()),
    setToAuthenticate: () => dispatch(setToAuthenticateFn()),
    successAlert: text => dispatch(successAlertFn(text)),
    errorAlert: message => dispatch(errorAlertFn(message)),
    fetchUserFromCookie: () => dispatch(fetchUserFromCookieFn())
});

export default connect(
    mapStateToProp,
    mapDispatchToProp
)(withRouter(Authentication));
