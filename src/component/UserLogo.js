import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserLogo = ({ user }) => {
    const { t } = useTranslation();

    return (
        <div className="author-image author-image-42">
            <Link to={`/user-profile/${user.id}`}>
                <span className="author-image-span">
                    <img
                        className="avatar avatar-42 photo"
                        alt="photo"
                        width="42"
                        height="42"
                        src={user.avatar}
                    />
                </span>
            </Link>
            <div className="author-image-pop-2">
                <div className="post-section user-area user-area-columns_pop">
                    <div className="post-inner">
                        <div className="author-image author-image-70">
                            <Link to={`/user-profile/${user.id}`}>
                                <span className="author-image-span">
                                    <img
                                        className="avatar avatar-70 photo"
                                        alt=""
                                        width="70"
                                        height="70"
                                        src={user.avatar}
                                    />
                                </span>
                            </Link>
                        </div>
                        <div className="user-content">
                            <div className="user-inner">
                                <div className="user-data-columns">
                                    <h4>
                                        <Link to={`/user-profile/${user.id}`}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </Link>
                                    </h4>
                                    <div className="user-data">
                                        <ul>
                                            <li className="city-country">
                                                <i className="icon-location" />
                                                {t('mainpage_danang_vietnam')}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-columns-data">
                            <ul>
                                <li>
                                    <a href="/user-profile/martin/questions/">
                                        <i className="icon-book-open" />
                                        {user.numberOfQuestions}{' '}
                                        {t('common_questions')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/user-profile/martin/answers/">
                                        <i className="icon-comment" />
                                        {user.numberOfAnswers}{' '}
                                        {t('common_answers')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/user-profile/martin/best-answers/">
                                        <i className="icon-graduation-cap" />
                                        {user.numberOfBestAnswers}{' '}
                                        {t('answer_best_answers')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/user-profile/martin/points/">
                                        <i className="icon-bucket" />
                                        {user.points} {t('common_points')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="user-follow-profile">
                            <Link to={`/user-profile/${user.id}`}>
                                {t('common_view_profile')}
                            </Link>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogo;
