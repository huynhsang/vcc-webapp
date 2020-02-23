import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import COUNTRIES from './countries.constant';

import dateformat from 'dateformat';

const InfoTable = styled.table`
    color: black;
    box-shadow: 0px 2px 6px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    border: none;
`;

const TR = styled.tr`
    & td {
        border: none;
    }
    & td:first-child {
        min-width: 20%;
        font-weight: 600;
        padding-right: 20px;
    }
`;

const Tab = ({ label, value }) => (
    <TR>
        <td>{label}</td>
        <td>{value}</td>
    </TR>
);

const Infos = ({ currentUser }) => {
    const { t } = useTranslation();
    const {
        lastName,
        firstName,
        email,
        nationality,
        dateOfBirth,
        summary,
        username
    } = currentUser;

    const country = COUNTRIES.find(val => val.value === nationality);
    const countryName = country ? country.label : '';

    return (
        <InfoTable>
            <tbody>
                <Tab label={t('common_userName')} value={username} />
                <Tab label={t('common_lastname')} value={lastName} />
                <Tab label={t('common_firstname')} value={firstName} />
                <Tab label={t('common_email')} value={email} />
                <Tab
                    label={t('my_profile_you_come_from')}
                    value={countryName}
                />
                <Tab
                    label={t('common_date_of_birth')}
                    value={dateOfBirth && dateformat(dateOfBirth, 'dd-mm-yyyy')}
                />
                <Tab label={t('common_summary')} value={summary} />
            </tbody>
        </InfoTable>
    );
};

export default Infos;
