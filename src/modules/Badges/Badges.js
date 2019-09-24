import React from 'react';

import { useTranslation } from 'react-i18next';

import { HomeLayout } from '../HomeLayout';

const Badges = () => {
    const { t } = useTranslation();
    return (
        <HomeLayout>
            <div className="discy-main-inner float_l">
                <div className="breadcrumbs">
                    <span className="crumbs">
                        <span>
                            <a>
                                <i className="icon-home" />
                                {t('common_home')}
                            </a>
                            <span>
                                <span className="crumbs-span"> / </span>
                                <span className="current">
                                    {t('common_badges')}
                                </span>
                            </span>
                        </span>
                    </span>
                    <div className="breadcrumb-right">
                        <div className="clearfix" />
                    </div>
                </div>
                <div className="clearfix" />
                <div className="page-sections">
                    <div className="page-section">
                        <div className="page-wrap-content">
                            <h2 className="post-title-3">
                                <i className="icon-bucket" />
                                {t('badges_point_system')}
                            </h2>
                            <div className="post-content-text">
                                <p>{t('badges_beside_gaining_reputation')}</p>
                            </div>
                            <div className="points-section">
                                <ul className="row">
                                    <li className="col col4">
                                        <div
                                            className="point-section"
                                            style={{ height: '109px' }}
                                        >
                                            <div className="point-div">
                                                <i className="icon-bucket" />
                                                <span>20</span>
                                                {t('common_points')}
                                            </div>
                                            <p>
                                                {t('badges_points_for_a_new')}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div
                                            className="point-section"
                                            style={{ height: '109px' }}
                                        >
                                            <div className="point-div">
                                                <i className="icon-bucket"></i>
                                                <span>5</span>
                                                {t('common_points')}
                                            </div>
                                            <p>
                                                {t('badges_choosing_the_best')}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div
                                            className="point-section"
                                            style={{ height: '109px' }}
                                        >
                                            <div className="point-div">
                                                <i className="icon-bucket"></i>
                                                <span>2</span>
                                                {t('common_points')}
                                            </div>
                                            <p>{t('badges_add_an_answer')}</p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div
                                            className="point-section"
                                            style={{ height: '109px' }}
                                        >
                                            <div className="point-div">
                                                <i className="icon-bucket"></i>
                                                <span>1</span>
                                                {t('common_points')}
                                            </div>
                                            <p>
                                                {t('badges_voting_a_question')}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div
                                            className="point-section"
                                            style={{ height: '109px' }}
                                        >
                                            <div className="point-div">
                                                <i className="icon-bucket"></i>
                                                <span>1</span>
                                                {t('common_points')}
                                            </div>
                                            <p>
                                                {t('badges_following_a_user')}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div
                                            className="point-section"
                                            style={{ height: '109px' }}
                                        >
                                            <div className="point-div">
                                                <i className="icon-bucket"></i>
                                                <span>1</span>
                                                {t('common_points')}
                                            </div>
                                            <p>
                                                {t('badges_voting_an_answer')}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="page-section">
                        <div className="page-wrap-content">
                            <h2 className="post-title-3">
                                <i className="icon-trophy" />
                                {t('badges_badges_system')}
                            </h2>
                            <div className="post-content-text">
                                <p>{t('badges_beside_gaining_reputation')}</p>
                            </div>
                            <div className="badges-section">
                                <ul>
                                    <li>
                                        <div className="badge-section">
                                            <div
                                                className="badge-div"
                                                style={{ height: '96px' }}
                                            >
                                                <span
                                                    className="badge-span"
                                                    style={{
                                                        backgroundColor:
                                                            '#0d0e11'
                                                    }}
                                                >
                                                    {t('common_beginner')}
                                                </span>
                                                <div className="point-div">
                                                    <i className="icon-bucket" />
                                                    <span>10</span>
                                                    {t('common_points')}
                                                </div>
                                            </div>
                                            <p>
                                                {t('badges_you_must_have')} 50{' '}
                                                {t('badges_in_at_least')} 10
                                                {t('badges_non_community_wiki')}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div
                                                className="badge-div"
                                                style={{ height: '96px' }}
                                            >
                                                <span
                                                    className="badge-span"
                                                    style={{
                                                        backgroundColor:
                                                            '#de2b2b'
                                                    }}
                                                >
                                                    {t('common_teacher')}
                                                </span>
                                                <div className="point-div">
                                                    <i className="icon-bucket" />
                                                    <span>50</span>
                                                    {t('common_points')}
                                                </div>
                                            </div>
                                            <p>
                                                {t('badges_you_must_have')} 100{' '}
                                                {t('badges_in_at_least')} 50
                                                {t(
                                                    'badges_non_community_wiki'
                                                )}{' '}
                                                50.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div
                                                className="badge-div"
                                                style={{ height: '96px' }}
                                            >
                                                <span
                                                    className="badge-span"
                                                    style={{
                                                        backgroundColor:
                                                            '#ffbf00'
                                                    }}
                                                >
                                                    {t('badges_pundit')}
                                                </span>
                                                <div className="point-div">
                                                    <i className="icon-bucket" />
                                                    <span>100</span>
                                                    {t('common_points')}
                                                </div>
                                            </div>
                                            <p>
                                                {t('badges_you_must_have')} 150{' '}
                                                {t('badges_in_at_least')} 100
                                                {t(
                                                    'badges_non_community_wiki'
                                                )}{' '}
                                                100.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div
                                                className="badge-div"
                                                style={{ height: '96px' }}
                                            >
                                                <span
                                                    className="badge-span"
                                                    style={{
                                                        backgroundColor:
                                                            '#30a96f'
                                                    }}
                                                >
                                                    {t('badges_explainer')}
                                                </span>
                                                <div className="point-div">
                                                    <i className="icon-bucket" />
                                                    <span>150</span>
                                                    {t('common_points')}
                                                </div>
                                            </div>
                                            <p>
                                                {t('badges_you_must_have')} 200{' '}
                                                {t('badges_in_at_least')} 150
                                                {t(
                                                    'badges_non_community_wiki'
                                                )}{' '}
                                                150.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div
                                                className="badge-div"
                                                style={{ height: '96px' }}
                                            >
                                                <span
                                                    className="badge-span"
                                                    style={{
                                                        backgroundColor:
                                                            '#6b3de4'
                                                    }}
                                                >
                                                    {t('badges_professional')}
                                                </span>
                                                <div className="point-div">
                                                    <i className="icon-bucket" />
                                                    <span>200</span>
                                                    {t('common_points')}
                                                </div>
                                            </div>
                                            <p>
                                                {t('badges_you_must_have')} 250{' '}
                                                {t('badges_in_at_least')} 200
                                                {t(
                                                    'badges_non_community_wiki'
                                                )}{' '}
                                                200.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div
                                                className="badge-div"
                                                style={{ height: '96px' }}
                                            >
                                                <span
                                                    className="badge-span"
                                                    style={{
                                                        backgroundColor:
                                                            '#d9a34a'
                                                    }}
                                                >
                                                    {t('badges_enlightened')}
                                                </span>
                                                <div className="point-div">
                                                    <i className="icon-bucket" />
                                                    <span>250</span>
                                                    {t('common_points')}
                                                </div>
                                            </div>
                                            <p>
                                                {t('badges_you_must_have')} 250{' '}
                                                {t('badges_in_at_least')} 250
                                                {t(
                                                    'badges_non_community_wiki'
                                                )}{' '}
                                                250.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Badges;
