import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import passwordValidator from 'password-validator';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { errorAlertFn, successAlertFn } from '../../../actions/alertConfirm';

import { changeUserPassword } from '../../../services/user.service';

const useStyles = makeStyles(() => ({
    textInput: {
        width: '100%',
        margin: '10px 0'
    }
}));

const schema = new passwordValidator();
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces(); // Should not have spaces

const Wrapper = styled.div`
    padding: 5px 20px 20px 20px;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: end;

    & button:first-child {
        margin-right: 15px;
    }
`;

const ChangePassword = ({ errorAlert, successAlert }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

    const onSubmit = () => {
        if (!newPassword || !confirmNewPassword || !oldPassword) {
            errorAlert(t('my_profile_please_complete_all_fields'));
        } else if (newPassword !== confirmNewPassword) {
            errorAlert(t('my_profile_passwords_not_identique'));
        } else if (!schema.validate(newPassword)) {
            errorAlert(t('my_profile_passwords_contrain'));
        } else {
            changeUserPassword({ oldPassword, newPassword })
                .then(() => {
                    successAlert(t('my_profile_change_password_success'));
                })
                .catch(err => {
                    errorAlert(err.response.data.error.message);
                });
        }
    };

    const reset = () => {
        setOldPassword('');
        setNewPassword('');
    };

    return (
        <Wrapper>
            <TextField
                variant="outlined"
                type="password"
                className={classes.textInput}
                value={oldPassword}
                label={t('my_profile_old_password')}
                onChange={e => setOldPassword(e.target.value)}
                margin="dense"
            />

            <TextField
                variant="outlined"
                type="password"
                className={classes.textInput}
                value={newPassword}
                label={t('my_profile_new_password')}
                onChange={e => setNewPassword(e.target.value)}
                margin="dense"
            />

            <TextField
                variant="outlined"
                type="password"
                className={classes.textInput}
                value={confirmNewPassword}
                label={t('my_profile_confirm_new_password')}
                onChange={e => setConfirmNewPassword(e.target.value)}
                margin="dense"
            />

            <ButtonsWrapper>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={reset}
                >
                    {t('common_reset')}
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    {t('common_save')}
                </Button>
            </ButtonsWrapper>
        </Wrapper>
    );
};

const mapDispatchToProps = dispatch => ({
    successAlert: message => dispatch(successAlertFn(message)),
    errorAlert: message => dispatch(errorAlertFn(message))
});

export default connect(null, mapDispatchToProps)(ChangePassword);
