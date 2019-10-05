import React from 'react';
import styled from 'styled-components';
import { changeLanguage, i18n } from '../../services/localize';
import { useTranslation } from 'react-i18next';

import { Dropdown } from 'primereact/dropdown';

const Wrapper = styled.div`
    float: right;
    position: ${p => p.position};
    top: ${p => p.top};
    right: ${p => p.right};
    margin: ${p => p.margin || '0 0 0 15px'};

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

const LanguageSelector = ({customStyle}) => {
    useTranslation();

    const activeItem = items.find(item => item.value === i18n.language);

    return (
        <Wrapper {...customStyle}>
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
