import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

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

const ChangePassword = () => {
    const { t } = useTranslation();

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    const onSubmit = () => {
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
                type='password'
                onChange={e => setOldPassword(e.target.value)}
            />
            <Title>{t('my_profile_new_password')}</Title>
            <InputText
                value={newPassword}
                type='password'
                onChange={e => setNewPassword(e.target.value)}
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

export default ChangePassword;
