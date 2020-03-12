import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import LoginRequestBuilder from '../../global/LoginRequest';
import { useTranslation } from 'react-i18next';
import RootScope from '../../global/RootScope';

import { login } from '../../services/account.service';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import SocialLogin from './SocialLogin';

const useStyle = makeStyles(() => ({
    loginButton: {
        marginTop: 10
    }
}));

const Wrapper = styled.div`
    padding: 0px 1em 20px;
`;

const FootWrapper = styled.div`
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(180, 180, 180, 0.7);
    text-align: center;
`;

const ClickDiv = styled.strong`
    cursor: pointer;
    opacity: 0.8;
    &:hover {
        opacity: 1;
    }
`;

const Login = ({
    showSuccessAlert,
    showErrorAlert,
    setToFindPassword,
    setToRegistre,
    hideAuthentification,
    fetchUserFromCookie
}) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const onSubmit = event => {
        event.preventDefault();
        const data = LoginRequestBuilder.build(email, password, rememberMe);

        if (!email || !password) {
            showErrorAlert(t('authentication_please_enter_email_and_password'));
        } else {
            login(data)
                .then(data => {
                    showSuccessAlert('Success!', 'Logged in');
                    fetchUserFromCookie();
                    hideAuthentification();
                })
                .catch(err => {
                    RootScope.resetAuthValues();
                    showErrorAlert(err.response.data.error.message);
                });
        }
    };

    return (
        <Wrapper>
            <SocialLogin />
            <div>
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
                <FormControlLabel
                    control={
                        <Switch
                            checked={rememberMe}
                            onChange={ev => setRememberMe(ev.target.checked)}
                            color="primary"
                        />
                    }
                    label={t('authentification_remember_me')}
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onSubmit}
                    color="primary"
                    className={classes.loginButton}
                >
                    {t('common_login')}
                </Button>
            </div>
            <FootWrapper>
                <div>
                    {`${t('authentification_donot_have_account')} `}
                    <ClickDiv onClick={setToRegistre}>
                        {t('authentification_sign_up')}
                    </ClickDiv>
                </div>
                <ClickDiv onClick={setToFindPassword}>
                    {t('authentification_forgot_your_password')}
                </ClickDiv>
            </FootWrapper>
        </Wrapper>
    );
};

export default Login;
