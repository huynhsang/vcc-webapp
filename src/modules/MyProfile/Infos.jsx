import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const InfoTable = styled.table`
    color: black;
`;

const TR = styled.tr`
    & td {
        border: none;
    }
    & td:first-child {
        min-width: 20%;
        font-weight:600;
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
    const { lastName, firstName, email, nationality, dateOfBirth, summary } = currentUser;
    return (
        <InfoTable>
            <tbody>
                <Tab label={t('common_lastname')} value={lastName} />
                <Tab label={t('common_firstname')} value={firstName} />
                <Tab label={t('common_email')} value={email} />
                <Tab label={t('my_profile_you_come_from')} value={nationality} />
                <Tab label={t('common_date_of_birth')} value={dateOfBirth} />
                <Tab label={t('common_summary')} value={summary} />
            </tbody>
        </InfoTable>
    );
};

export default Infos;
