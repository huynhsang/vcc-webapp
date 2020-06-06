import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useTranslation } from 'react-i18next';

import { register } from '../../services/account.service';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import SocialLogin from './SocialLogin';

const useStyle = makeStyles(() => ({
    button: {
        fontSize: 12,
        marginTop: 20
    },
    submitButton: {
        marginTop: 10
    }
}));

const Wrapper = styled.div`
    padding: 0px 1em 20px;
`;

const LoaderWrapper = styled.div`
    width: 100%;
    min-height: 420px;
    position: relative;
    & > div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
`;

const Registration = ({
    history,
    successAlert,
    errorAlert,
    setToLogin,
    hideAuthentification
}) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [loader, setLoader] = React.useState(false);

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();
        const data = {
            password,
            email,
            firstName,
            lastName,
        };

        setLoader(true);
        register(data)
            .then(() => {
                setLoader(false);
                successAlert(t('authentification_check_your_email'));
                hideAuthentification();
                history.push('/home');
            })
            .catch(err => {
                setLoader(false);
                errorAlert(err.response.data.error.message);
            });
    };

    if (loader) {
        return (
            <LoaderWrapper>
                <CircularProgress />
            </LoaderWrapper>
        );
    }

    return (
        <Wrapper>
            <SocialLogin />
            <TextField
                fullWidth
                label={t('authentification_first_name')}
                variant="outlined"
                value={firstName}
                onChange={ev => setFirstName(ev.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label={t('authentification_last_name')}
                variant="outlined"
                value={lastName}
                onChange={ev => setLastName(ev.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label={t('common_email')}
                variant="outlined"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                margin="normal"
            />
            <TextField
                type="password"
                fullWidth
                label={t('common_password')}
                variant="outlined"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                margin="normal"
            />
            <TextField
                type="password"
                fullWidth
                label={t('authentification_confirm_password')}
                variant="outlined"
                value={confirmPassword}
                onChange={ev => setConfirmPassword(ev.target.value)}
                margin="normal"
            />

            <Button
                fullWidth
                variant="contained"
                onClick={onSubmit}
                color="primary"
                className={classes.submitButton}
            >
                {t('authentification_create_account')}
            </Button>
            <Button
                color="default"
                className={classes.button}
                startIcon={<ChevronLeft />}
                onClick={setToLogin}
            >
                {t('authentification_back_to_login')}
            </Button>
        </Wrapper>
    );
};

export default Registration;
