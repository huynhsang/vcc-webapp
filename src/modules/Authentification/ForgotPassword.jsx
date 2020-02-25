import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import RootScope from '../../global/RootScope';
import { resetPassword } from '../../services/account.service';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Lock from '@material-ui/icons/Lock';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

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
    padding: 30px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentWrapper = styled.div`
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    box-shadow: 0 0 1em #d9d9d9;
    position: relative;
    width: 90%;
    text-align: center;
    ${media.mobileLandscape`
        padding: 10px;
    `}
`;

const LockIcon = styled(Lock)`
    font-size: 120px !important;
`;

const LeftAlign = styled.div`
    text-align: left;
`;

const ForgotPassword = ({
    setToLogin,
    showSuccessAlert,
    showErrorAlert,
    hideAuthentification
}) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [email, setEmail] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();
        resetPassword(email)
            .then(() => {
                hideAuthentification();
                showSuccessAlert(
                    'Success!',
                    t('forgot_password_please_verify_your_email')
                );
            })
            .catch(err => {
                RootScope.resetAuthValues();
                showErrorAlert(err.response.data.error.message);
            });
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <LockIcon />
                <div>{t('authentification_enter_your_email')}</div>
                <TextField
                    fullWidth
                    label={t('common_email')}
                    variant="outlined"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    margin="normal"
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onSubmit}
                    color="primary"
                    className={classes.submitButton}
                >
                    {t('authentification_reset_password')}
                </Button>
                <LeftAlign>
                    <Button
                        color="default"
                        className={classes.button}
                        startIcon={<ChevronLeft />}
                        onClick={setToLogin}
                    >
                        {t('authentification_back_to_login')}
                    </Button>
                </LeftAlign>
            </ContentWrapper>
        </Wrapper>
    );
};

export default ForgotPassword;
