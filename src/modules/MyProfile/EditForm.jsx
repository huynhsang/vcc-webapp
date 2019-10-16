import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import COUNTRIES from './countries.constant';

const Title = styled.div`
    margin: 10px 0 5px;
    color: black;
`;

const Form = styled.form`
    margin-bottom: 50px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: end;

    & button:first-child {
        margin-right: 15px;
    }
`;

const EditForm = ({ currentUser }) => {
    const { t } = useTranslation();

    const [userEditted, setUserEditted] = React.useState(currentUser);

    const {
        lastName,
        firstName,
        email,
        nationality,
        dateOfBirth,
        summary
    } = userEditted;

    const updateUser = (name, value) => {
        setUserEditted({ ...userEditted, [name]: value });
    };

    const handleEvent = (name, ev) => updateUser(name, ev.target.value);

    return (
        <Form>
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
                value={dateOfBirth}
                placeholder="mm/dd/YY"
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
                />
                <Button label={t('common_save')} icon="pi pi-check" />
            </ButtonsWrapper>
        </Form>
    );
};

export default EditForm;
