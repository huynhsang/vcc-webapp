import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { errorAlertFn, successAlertFn } from '../../actions/alertConfirm';

import { setNewPassword } from '../../services/account.service';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/Lock';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyle = makeStyles(() => ({
    submitButton: {
        marginTop: 10
    }
}));

const Wrapper = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 186px);
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

const ResetPassword = ({ location, history, successAlert, errorAlert }) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return errorAlert(t('authentification_invalid_comfirm_password'));
        }

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('accessToken');

        setNewPassword(token, password)
            .then(() => {
                successAlert(
                    t('authentification_your_password_has_been_reset')
                );
                history.push('/questions');
            })
            .catch(err => {
                errorAlert(err.response.data.error.message);
            });
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <LockIcon />
                <h3>{t('authentification_enter_new_password')}</h3>
                <TextField
                    type="password"
                    fullWidth
                    label={t('authentification_new_password')}
                    variant="outlined"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    margin="normal"
                />
                <TextField
                    type="password"
                    fullWidth
                    label={t('authentification_confirm_new_password')}
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
            </ContentWrapper>
        </Wrapper>
    );
};

const mapDispatchToProp = dispatch => ({
    successAlert: text => dispatch(successAlertFn(text)),
    errorAlert: text => dispatch(errorAlertFn(text))
});

export default connect(null, mapDispatchToProp)(withRouter(ResetPassword));
