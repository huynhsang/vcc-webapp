import React from 'react';
import { connect } from 'react-redux';

import LeftNav from './LeftNav';
import { withRouter } from 'react-router-dom';
import { RightSlideBar } from './RightSlideBar';

import { useTranslation } from 'react-i18next';

import HomeRouter from './HomeRouter';
import { setToRegistreFn } from '../../actions/app';

import MobileBar from './MobileBar';

import {
    getTopUsersFn,
    getPopularQuestionsFn,
    getQuestionsTopAnsweredFn,
    getTrendingTagsFn
} from '../../actions/home';

const Home = ({
    App,
    Home,
    setToRegistre,
    getTopUsers,
    getPopularQuestions,
    getQuestionsTopAnswered,
    getTrendingTags
}) => {
    const { t } = useTranslation();

    React.useEffect(() => {
        getTopUsers();
        getPopularQuestions();
        getQuestionsTopAnswered();
        getTrendingTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isAuthenticated } = App;
    const {
        topUsers,
        popularQuestions,
        questionsTopAnswered,
        trendingTags
    } = Home;

    return (
        <>
            <MobileBar />
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
                                <a
                                    onClick={setToRegistre}
                                    className="signup-panel button-default call-action-button"
                                    style={{ marginTop: '47.5px' }}
                                >
                                    {t('home_create_a_new_account')}
                                </a>
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
                                    minHeight: '1px'
                                }}
                            >
                                <div
                                    className="theiaStickySidebar"
                                    style={{
                                        paddingTop: '0px',
                                        paddingBottom: '1px',
                                        position: 'static'
                                    }}
                                >
                                    <HomeRouter />
                                    <div className="hide-main-inner" />
                                    <div className="hide-sidebar sidebar-width">
                                        <div className="hide-sidebar-inner" />
                                    </div>

                                    <RightSlideBar
                                        topUsers={topUsers}
                                        popularQuestions={popularQuestions}
                                        questionsTopAnswered={
                                            questionsTopAnswered
                                        }
                                        trendingTags={trendingTags}
                                    />
                                </div>
                            </main>
                            <LeftNav />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = ({ App, Home }) => ({
    App,
    Home
});

const mapDispatchToProps = dispatch => ({
    setToRegistre: () => dispatch(setToRegistreFn()),
    getTopUsers: () => dispatch(getTopUsersFn()),
    getPopularQuestions: () => dispatch(getPopularQuestionsFn()),
    getQuestionsTopAnswered: () => dispatch(getQuestionsTopAnsweredFn()),
    getTrendingTags: () => dispatch(getTrendingTagsFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Home));
