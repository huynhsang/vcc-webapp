import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { headerTabs } from './header.constant';

const MainMenu = ({ location }) => {
    const { t } = useTranslation();

    const { pathname } = location;

    const paths = pathname.match(/\/[\w-]+/g);
    const tabSelected = paths && paths[0] ? paths[0].substring(1) : '';

    return (
        <ul id="menu-header" className="menu">
            {headerTabs.map(val => (
                <li
                    className={
                        val.path === tabSelected ? 'current-menu-item' : ''
                    }
                    key={val.label}
                >
                    <Link to={`/${val.path}`}>{t(`${val.label}`)}</Link>
                </li>
            ))}
            <li key={'blog'}>
                <a href="https://lqdalumni.site/">{t('header_blog')}</a>
            </li>
        </ul>
    );
};

export default MainMenu;
