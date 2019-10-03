import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { leftNavTabs } from './nav.constant';

// TO DO Detect active path

const LeftNav = ({ location }) => {
    const { t } = useTranslation();

    const { pathname } = location;

    const params = new URLSearchParams(location.search);
    const currentShow = params.get('show');

    return (
        <nav className="nav_menu float_r fixed_nav_menu sider-left">
            <div
                className="theiaStickySidebar"
                style={{
                    paddingTop: '0px',
                    paddingBottom: '1px',
                    position: 'static',
                    top: '30px',
                    left: '135px'
                }}
            >
                <h3 className="screen-reader-text">Explore</h3>
                <ul className="menu">
                    {leftNavTabs.map(tab => {
                        if (!tab.children) {
                            return (
                                <li
                                    key={tab.path}
                                    className={
                                        pathname === tab.path
                                            ? 'current_page_item'
                                            : ''
                                    }
                                >
                                    <Link to={tab.path}>
                                        <i className={tab.iconClassName} />
                                        {t(tab.label)}
                                    </Link>
                                </li>
                            );
                        }

                        return (
                            <li
                                key={tab.path}
                                className={`nav_menu_open ${
                                    pathname === tab.path
                                        ? 'current_page_item'
                                        : ''
                                }`}
                            >
                                <Link to={tab.path}>
                                    <i className={tab.iconClassName} />
                                    {t(tab.label)}
                                </Link>
                                {pathname.includes(tab.path) && (
                                    <ul className="sub-menu">
                                        {tab.children.map(childTab => (
                                            <li
                                                key={childTab.path}
                                                className={
                                                    `/?show=${currentShow}` ===
                                                    childTab.path
                                                        ? 'current-menu-item'
                                                        : ''
                                                }
                                            >
                                                <Link
                                                    to={
                                                        tab.path + childTab.path
                                                    }
                                                >
                                                    {t(childTab.label)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(LeftNav);

/* <li className="wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom li-poll">
          <Link to="/questions/?type=poll">

          <i className="icon-megaphone"/>Polls
          </Link>
          </li> */
