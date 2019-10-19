import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FilterBuilder, { Filter } from '../../../global/Filter';
import { User } from '../../../domain/User';
import { Question } from '../../../domain/Question';
import { SubCategory } from '../../../domain/SubCategory';

import TopQuestions from './TopQuestions';
import TopUsers from './TopUsers';
import TopTrendingTags from './TopTrendingTags';

//TO DO: List popular, list Answers
const RightSideBar = ({
    topUsers,
    popularQuestions,
    questionsTopAnswered,
    trendingTags
}) => {
    const { t } = useTranslation();

    return (
        <aside
            className="sidebar sidebar-width float_l fixed-sidebar"
            style={{
                position: 'relative',
                overflow: 'visible',
                minHeight: '1px'
            }}
        >
            <div
                className="theiaStickySidebar"
                style={{
                    paddingTop: '0px',
                    paddingBottom: '1px',
                    position: 'static',
                    top: '0px',
                    left: '1026px'
                }}
            >
                <h3 className="screen-reader-text">{t('common_slidebar')}</h3>
                <div className="inner-sidebar">
                    <div className="widget widget_ask">
                        <Link
                            to="/add-question"
                            className="button-default wpqa-question"
                        >
                            {t('home_ask_a_question')}
                        </Link>
                    </div>
                    <section
                        id="stats-widget-2"
                        className="widget-no-divider widget stats-widget"
                    >
                        <h3 className="screen-reader-text">
                            {t('common_stats')}
                        </h3>
                        <div className="widget-wrap">
                            <ul className="stats-inner">
                                <li className="stats-questions">
                                    <div>
                                        <span className="stats-text">
                                            {t('common_questions')}
                                        </span>
                                        <span className="stats-value">21</span>
                                    </div>
                                </li>
                                <li className="stats-answers">
                                    <div>
                                        <span className="stats-text">
                                            {t('common_answers')}
                                        </span>
                                        <span className="stats-value">69</span>
                                    </div>
                                </li>
                                <li className="stats-best_answers">
                                    <div>
                                        <span className="stats-text">
                                            {t('nav_best_answers')}
                                        </span>
                                        <span className="stats-value">10</span>
                                    </div>
                                </li>
                                <li className="stats-users">
                                    <div>
                                        <span className="stats-text">
                                            {t('common_users')}
                                        </span>
                                        <span className="stats-value">118</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <TopQuestions
                        popularQuestions={popularQuestions}
                        questionsTopAnswered={questionsTopAnswered}
                    />
                    <TopUsers topUsers={topUsers} />
                    <TopTrendingTags trendingTags={trendingTags} />
                </div>
            </div>
        </aside>
    );
};

export default RightSideBar;
