import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';

import COUNTRIES from './countries.constant';

import dateformat from 'dateformat';

const USERNAME_REGEX = /([A-Za-z0-9_]){8,24}/;

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

const EditForm = ({ currentUser, updateCurrentUser, showErrorAlert }) => {
    const { t } = useTranslation();

    const [userEditted, setUserEditted] = React.useState(currentUser);

    const [birthDayEditted, setBirthDayEditted] = React.useState(null);

    const {
        username,
        lastName,
        firstName,
        nationality,
        dateOfBirth,
        summary
    } = userEditted;

    React.useEffect(() => {
        setBirthDayEditted(
            dateOfBirth ? dateformat(dateOfBirth, 'mm/dd/yyyy') : null
        );
    }, [dateOfBirth]);

    const updateUser = (name, value) => {
        setUserEditted({ ...userEditted, [name]: value });
    };

    const handleEvent = (name, ev) => updateUser(name, ev.target.value);

    const onSubmit = () => {
        if (!USERNAME_REGEX.test(username)) {
            return showErrorAlert('common_invalid_username');
        }
        updateCurrentUser({
            ...userEditted,
            dateOfBirth: birthDayEditted ? new Date(birthDayEditted) : null
        });
    };

    const reset = () => {
        setUserEditted(currentUser);
    };

    return (
        <Wrapper>
            <Title>{t('common_userName')}</Title>
            <InputText
                value={username}
                onChange={e => handleEvent('username', e)}
            />
            <Title>{t('common_lastname')}</Title>
            <InputText
                value={lastName}
                onChange={e => handleEvent('lastName', e)}
            />
            <Title>{t('common_firstname')}</Title>
            <InputText
                value={firstName}
                onChange={e => handleEvent('firstName', e)}
            />
            <Title>{t('common_date_of_birth')}</Title>
            <InputMask
                mask="99/99/9999"
                value={birthDayEditted}
                placeholder="mm/dd/yyyy"
                onChange={e => setBirthDayEditted(e.value)}
            ></InputMask>
            <Title>{t('my_profile_you_come_from')}</Title>
            <Dropdown
                optionLabel="name"
                value={COUNTRIES.find(val => val.code === nationality)}
                options={COUNTRIES}
                onChange={ev => updateUser('nationality', ev.value.code)}
                placeholder={t('my_profile_choose_one_country')}
            />
            <Title>{t('common_summary')}</Title>
            <InputTextarea
                rows={5}
                value={summary}
                onChange={e => handleEvent('summary', e)}
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

export default EditForm;
