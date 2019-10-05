import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { toggleMobileAsideFn } from '../../actions/app';

import { leftNavTabs } from '../Home/nav.constant';

import { LanguageSelector } from '../LanguageSelector';

const MobileAside = ({
    isOpenMobileAside,
    toggleMobileAside,
    history,
    location
}) => {
    const { t } = useTranslation();

    //mobile-aside mobile-menu-wrap gray-mobile-menu mobile-aside-open

    const onClickTab = (path, toHide = true) => () => {
        if (toHide) {
            toggleMobileAside(false);
        }
        history.push(path);
    };

    const { pathname } = location;

    const params = new URLSearchParams(location.search);
    const currentShow = params.get('show');

    const renderTabsChildren = tab => {
        return (
            <li
                key={tab.path}
                className={pathname === tab.path ? 'active' : ''}
            >
                <a onClick={onClickTab(tab.path)}>
                    <i className={tab.iconClassName} />
                    {t(tab.label)}
                </a>
                <ul
                    className="sub-menu"
                    style={{
                        display: pathname.includes(tab.path) ? 'block' : '',
                        color: 'black'
                    }}
                >
                    {tab.children.map(childTab => (
                        <li
                            key={childTab.path}
                            className={`menu-item menu-item-type-custom menu-item-object-custom ${
                                `/?show=${currentShow}` === childTab.path
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <a onClick={onClickTab(tab.path + childTab.path)}>
                                {t(childTab.label)}
                            </a>
                        </li>
                    ))}
                </ul>
                <span
                    className="mobile-arrows"
                    onClick={onClickTab(tab.path, false)}
                >
                    <i className="icon-down-open" />
                </span>
            </li>
        );
    };

    return (
        <aside
            className={`mobile-aside mobile-menu-wrap gray-mobile-menu ${isOpenMobileAside &&
                'mobile-aside-open'}`}
        >
            <h3 className="screen-reader-text">Mobile menu</h3>
            <div className="mobile-aside-inner mCustomScrollbar _mCS_1 mCS_no_scrollbar">
                <div
                    id="mCSB_1"
                    className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                    style={{ maxHeight: 'none' }}
                    tabIndex="0"
                >
                    <div
                        id="mCSB_1_container"
                        className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                        style={{ position: 'relative', top: 0, left: 0 }}
                        dir="ltr"
                    >
                        <div className="mobile-aside-inner-inner">
                            <a
                                onClick={() => toggleMobileAside(false)}
                                className="mobile-aside-close"
                            >
                                <i className="icon-cancel" />
                                <span className="screen-reader-text">
                                    Close
                                </span>
                            </a>
                            <LanguageSelector
                                customStyle={{
                                    margin: '0',
                                    position: 'absolute',
                                    top: 0,
                                    right: '30px'
                                }}
                            />
                            <div className="mobile-menu-top mobile--top">
                                <div className="widget widget_ask">
                                    <a
                                        onClick={onClickTab('/add-question')}
                                        className="button-default wpqa-question"
                                    >
                                        {t('home_ask_a_question')}
                                    </a>
                                </div>
                            </div>
                            <ul id="nav_menu" className="menu">
                                {leftNavTabs.map(tab => {
                                    if (!tab.children) {
                                        return (
                                            <li
                                                className={
                                                    pathname === tab.path
                                                        ? 'active'
                                                        : ''
                                                }
                                                key={tab.label}
                                            >
                                                <a
                                                    onClick={onClickTab(
                                                        tab.path
                                                    )}
                                                >
                                                    <i
                                                        className={
                                                            tab.iconClassName
                                                        }
                                                    />
                                                    {t(tab.label)}
                                                </a>
                                            </li>
                                        );
                                    }

                                    return renderTabsChildren(tab);
                                })}
                            </ul>
                            <ul id="menu-header-1" className="menu">
                                <li>
                                    <a href="/blog/">Blog</a>
                                </li>
                                <li
                                    className={
                                        pathname === '/about-us' ? 'active' : ''
                                    }
                                >
                                    <a onClick={onClickTab('/about-us')}>
                                        {t('header_about_us')}
                                    </a>
                                </li>
                                <li
                                    className={
                                        pathname === '/contact-us'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <a onClick={onClickTab('/contact-us')}>
                                        {t('header_contact_us')}
                                    </a>
                                </li>
                            </ul>
                            <div className="mobile--top post-search">
                                <div className="row">
                                    <div className="col col12">
                                        <input
                                            type="search"
                                            className="live-search"
                                            autoComplete="off"
                                            name="search"
                                            defaultValue="Hit enter to search"
                                        />
                                        <div className="loader_2 search_loader"></div>
                                        <div className="search-results results-empty"></div>
                                        <input
                                            type="hidden"
                                            name="search_type"
                                            className="search_type"
                                            defaultValue="questions"
                                        />
                                    </div>
                                    <div className="wpqa_form col col12">
                                        <input
                                            type="submit"
                                            className="button-default"
                                            defaultValue="Search"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

// Retrieve data from store as props
const mapStateToProps = ({ App: { isOpenMobileAside } }) => ({
    isOpenMobileAside
});

const mapDispatchToProps = dispatch => ({
    toggleMobileAside: val => dispatch(toggleMobileAsideFn(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MobileAside));
