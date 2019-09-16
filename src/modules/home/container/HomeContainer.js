import React from 'react';

import LeftNav from '../component/left_nav/LeftNav';
import { Link, withRouter } from 'react-router-dom';
import RightSidebar from './RightSidebarImpl';

import { useTranslation } from 'react-i18next';

import HomeRouter from './HomeRouter';

const Home = ({ isAuthenticated, ChildComponent, match }) => {
    const { t } = useTranslation();

    return (
        <section>
            <div className="call-action-unlogged call-action-dark call-action-style_1">
                <div className="call-action-opacity" />
                <div className="discy-container">
                    <div className="col6">
                        <h3>{t('home_share_and_grow')}</h3>
                        <p>{t('home_description')}</p>
                    </div>
                    {!isAuthenticated && (
                        <div className="col3">
                            <Link
                                to="/registration"
                                className="signup-panel button-default call-action-button"
                                style={{ marginTop: '47.5px' }}
                            >
                                {t('home_create_a_new_account')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="discy-content">
                <div className="discy-inner-content menu_sidebar">
                    <div className="discy-container">
                        <main
                            className="discy-main-wrap discy-site-content float_l"
                            style={{
                                position: 'relative',
                                overflow: 'visible',
                                boxSizing: 'border-box',
                                minHeight: '1px',
                            }}
                        >
                            <div
                                className="theiaStickySidebar"
                                style={{
                                    paddingTop: '0px',
                                    paddingBottom: '1px',
                                    position: 'static',
                                }}
                            >
                                <HomeRouter />
                                <div className="hide-main-inner" />
                                <div className="hide-sidebar sidebar-width">
                                    <div className="hide-sidebar-inner" />
                                </div>

                                <RightSidebar />
                            </div>
                        </main>
                        <LeftNav />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Home);
