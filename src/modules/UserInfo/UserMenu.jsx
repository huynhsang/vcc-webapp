import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DefaultWrapper } from '../../component/Wrappers';
import { getIdAndToken } from '../../utils/cookie-tools';

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
        path: 'my-profile',
        label: 'common_my_profile'
    },

    {
        path: 'general',
        label: 'common_general_infos'
    },
    {
        path: 'question-asked',
        label: 'user_info_question_asked'
    },
    {
        path: 'answers-related',
        label: 'user_info_amswers_related'
    }
];

const UserMenu = ({ location, history, userId }) => {
    const { t } = useTranslation();
    const { pathname } = location;

    const { id } = getIdAndToken();
    const isMainUserProfile = id === userId;

    const paths = pathname.match(/\/[\w-]+/g);
    const tabSelected = paths && paths[2] ? paths[2].substring(1) : 'general';

    const tabs = isMainUserProfile
        ? TABS
        : TABS.filter((val, key) => key !== 0);

    const handleChange = (event, newValue) => {
        const { path } = tabs[newValue];
        history.push(`/users/${userId}/${path}`);
    };

    const activeIndex = tabs.findIndex(val => tabSelected === val.path);

    const tabsRender = tabs.map((tab, key) => (
        <Tab key={`tab-${key}`} label={t(tab.label)} {...a11yProps(key)} />
    ));

    console.log(activeIndex);

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

export default UserMenu;
