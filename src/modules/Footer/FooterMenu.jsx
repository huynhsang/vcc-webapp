import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const DEFAULT_TABS = [
    {
        label: 'common_about_us',
        path: 'about-us'
    },
    {
        label: 'common_contact_us',
        path: 'contact-us',
        isContact: true
    },
    {
        label: 'common_policy',
        path: 'policy-us'
    }
];

const Wrapper = styled.div`
    display: flex;
    border-left: 1px solid white;
`;

const Tab = styled.div`
    padding: 5px 0;
    min-width: 100px;
    text-align: center;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`;

const FooterMenu = ({ history, toggleContactUs }) => {
    const { t } = useTranslation();
    const onClick = (url, isContact) => () => {
        if (isContact) {
            return toggleContactUs(true);
        }
        history.push(url);
    };
    const renderTabs = DEFAULT_TABS.map(tab => (
        <Tab key={tab.label} onClick={onClick(tab.path, tab.isContact)}>
            {t(tab.label)}
        </Tab>
    ));
    return <Wrapper>{renderTabs}</Wrapper>;
};

export default FooterMenu;
