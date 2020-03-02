import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DefaultWrapper } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const FullWidth = styled.div`
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.05),
        0px 1px 10px 0px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(DefaultWrapper)`
    flex-grow: 1;
    padding: 0 20px;
    ${media.mobileLandscape`
        padding: 0 10px;
    `}
`;

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
    };
}

const TABS = [
    {
        path: 'copyright',
        label: 'Copyright'
    },

    {
        path: 'acceptableUse',
        label: 'Acceptable Use'
    },
    {
        path: 'privacy',
        label: 'Privacy'
    },
    {
        path: 'termsofservice',
        label: 'Terms Of Service'
    },
    {
        path: 'trademark',
        label: 'Trademark'
    }
];

const PolicyMenu = ({ location, history }) => {
    const { t } = useTranslation();
    const { pathname } = location;

    const paths = pathname.match(/\/[\w-]+/g);
    const tabSelected = paths && paths[1] ? paths[1].substring(1) : 'copyright';

    const handleChange = (event, newValue) => {
        const { path } = TABS[newValue];
        history.push(`/policy/${path}`);
    };

    const activeIndex = TABS.findIndex(val => tabSelected === val.path);

    const tabsRender = TABS.map((tab, key) => (
        <Tab key={`tab-${key}`} label={t(tab.label)} {...a11yProps(key)} />
    ));

    return (
        <FullWidth>
            <Wrapper>
                <Tabs
                    value={activeIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabsRender}
                </Tabs>
            </Wrapper>
        </FullWidth>
    );
};

export default PolicyMenu;
