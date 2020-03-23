import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { login } from '../../services/account.service';
import { Checkbox } from '../../component/Inputs';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import SocialLogin from './SocialLogin';

import { REALM } from '../../constants/constants';

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

const TermsSpan = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;

const Login = ({
    successAlert,
    errorAlert,
    setToFindPassword,
    setToRegistre,
    hideAuthentification,
    fetchUserFromCookie
}) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [agree, setAgree] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const onSubmit = () => {
        const data = {
            email,
            password,
            rememberMe,
            realm: REALM.user
        };

        if (!email || !password) {
            return errorAlert(
                t('authentication_please_enter_email_and_password')
            );
        }

        if (!agree) {
            return errorAlert(t('authentication_please_agree_with_our_terms'));
        }

        login(data)
            .then(data => {
                successAlert(t('common_logged_in'));
                fetchUserFromCookie();
                hideAuthentification();
            })
            .catch(err => {
                errorAlert(err.response.data.error.message);
            });
    };

    const goToTerms = () => {
        const { REACT_APP_DOMAIN_NAME } = process.env;
        window.open(`${REACT_APP_DOMAIN_NAME}/policy/termsofservice`, '_blank');
    };

    const passHandleKey = ev => {
        if (ev.keyCode === 13) {
            onSubmit();
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
                    onKeyDown={passHandleKey}
                    margin="normal"
                />
                <Checkbox
                    label={
                        <>
                            {t('authentication_i_agree')}
                            <TermsSpan onClick={goToTerms}>
                                {t('authentication_terms_and_condition')}
                            </TermsSpan>
                            {t('authentication_of_VCNC')}
                        </>
                    }
                    isChecked={agree}
                    handleChange={val => setAgree(val)}
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
