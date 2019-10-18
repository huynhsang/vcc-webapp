import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import COUNTRIES from './countries.constant';

import { isDate } from '../../../utils/detect-date';

const Title = styled.div`
    margin: 10px 0 5px;
    color: black;
`;

const Wrapper = styled.div`
    margin-bottom: 50px;
    padding: 5px 20px 20px 20px;
    border-radius: 2px;
    background-color:white;
    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: end;

    & button:first-child {
        margin-right: 15px;
    }
`;

const EditForm = ({ currentUser, updateCurrentUser }) => {
    const { t } = useTranslation();

    const [userEditted, setUserEditted] = React.useState(currentUser);

    const {
        lastName,
        firstName,
        nationality,
        dateOfBirth,
        summary
    } = userEditted;

    const updateUser = (name, value) => {
        setUserEditted({ ...userEditted, [name]: value });
    };

    const handleEvent = (name, ev) => updateUser(name, ev.target.value);

    const onSubmit = () => {
        updateCurrentUser(userEditted);
    };

    const reset = () => {
        setUserEditted(currentUser);
    };

    return (
        <Wrapper>
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
            <Calendar
                value={
                    isDate(dateOfBirth)
                        ? dateOfBirth
                        : dateOfBirth
                        ? new Date(dateOfBirth)
                        : null
                }
                placeholder="mm/dd/YY"
                dateFormat="mm/dd/yy"
                onChange={ev => updateUser('dateOfBirth', ev.value)}
            />
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
