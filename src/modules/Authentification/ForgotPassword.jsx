import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { resetPassword } from '../../services/account.service';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Lock from '@material-ui/icons/Lock';

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
    padding: 30px 1em 20px;
    text-align: center;
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
                showErrorAlert(err.response.data.error.message);
            });
    };

    return (
        <Wrapper>
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
        </Wrapper>
    );
};

export default ForgotPassword;
