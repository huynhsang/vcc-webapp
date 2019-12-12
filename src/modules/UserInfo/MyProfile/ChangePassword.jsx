import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import passwordValidator from 'password-validator';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import {
    showSuccessAlertFn,
    showErrorAlertFn
} from '../../../actions/sweetAlert';

import { changeUserPassword } from '../../../services/user.service';

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

const Title = styled.div`
    margin: 10px 0 5px;
    color: black;
`;

const Wrapper = styled.div`
    margin-bottom: 50px;
    padding: 5px 20px 20px 20px;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: end;

    & button:first-child {
        margin-right: 15px;
    }
`;

const ChangePassword = ({ showErrorNotification, showSuccessNotification }) => {
    const { t } = useTranslation();

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

    const onSubmit = () => {
        if (!newPassword || !confirmNewPassword || !oldPassword) {
            showErrorNotification(t('my_profile_please_complete_all_fields'));
        } else if (newPassword !== confirmNewPassword) {
            showErrorNotification(t('my_profile_passwords_not_identique'));
        } else if (!schema.validate(newPassword)) {
            showErrorNotification(t('my_profile_passwords_contrain'));
        } else {
            changeUserPassword({ oldPassword, newPassword })
                .then(() => {
                    showSuccessNotification(
                        t('my_profile_change_password_success')
                    );
                })
                .catch(err => {
                    showErrorNotification(err.response.data.error.message);
                });
        }
    };

    const reset = () => {
        setOldPassword('');
        setNewPassword('');
    };

    return (
        <Wrapper>
            <Title>{t('my_profile_old_password')}</Title>
            <InputText
                value={oldPassword}
                type="password"
                onChange={e => setOldPassword(e.target.value)}
            />
            <Title>{t('my_profile_new_password')}</Title>
            <InputText
                value={newPassword}
                type="password"
                onChange={e => setNewPassword(e.target.value)}
            />
            <Title>{t('my_profile_confirm_new_password')}</Title>
            <InputText
                value={confirmNewPassword}
                type="password"
                onChange={e => setConfirmNewPassword(e.target.value)}
            />
            <ButtonsWrapper>
                <Button
                    className="p-button-danger"
                    label={t('common_reset')}
                    icon="pi pi-times"
                    onClick={reset}
                />
                <Button
                    onClick={onSubmit}
                    label={t('common_save')}
                    icon="pi pi-check"
                />
            </ButtonsWrapper>
        </Wrapper>
    );
};

const mapDispatchToProps = dispatch => ({
    showErrorNotification: message =>
        dispatch(showErrorAlertFn('Error!', message)),
    showSuccessNotification: message =>
        dispatch(showSuccessAlertFn('Success!', message))
});

export default connect(null, mapDispatchToProps)(ChangePassword);
