import React from 'react';
import styled from 'styled-components';
import { changeLanguage, i18n } from '../../services/localize';
import { useTranslation } from 'react-i18next';

import { Dropdown } from 'primereact/dropdown';

const Wrapper = styled.div`
    float: right;
    margin-left: 15px;

    & .p-dropdown {
        line-height: normal;
        min-width: 115px;
        & .p-dropdown-label {
          padding: 3px 10px 3px 5px;
        }
    }
`;

const items = [
    {
        label: 'English',
        value: 'en'
    },
    {
        label: 'Vietnamese',
        value: 'vi'
    }
];

const supportLanguges = ['en', 'vi'];

const LanguageSelector = () => {
    useTranslation();

    const activeItem = items.find(item => item.value === i18n.language);

    return (
        <Wrapper>
            <Dropdown
                value={activeItem}
                options={items}
                onChange={ev => changeLanguage(ev.value.value)}
                placeholder="Language"
                optionLabel="label"
            />
        </Wrapper>
    );
};

export default LanguageSelector;
