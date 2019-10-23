import React from 'react';
import { Link } from 'react-router-dom';

const UserLogo = ({ user }) => {

    return (
        <div className="author-image author-image-42">
            <Link to={`/users/${user.id}`}>
                <span className="author-image-span">
                    <img
                        className="avatar avatar-42 photo"
                        alt=""
                        width="42"
                        height="42"
                        src={user.avatar}
                    />
                </span>
            </Link>
            {/* <div className="author-image-pop-2">
                <div className="post-section user-area user-area-columns_pop">
                    <div className="post-inner">
                        <div className="author-image author-image-70">
                            <Link to={`/users/${user.id}`}>
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
                                        <Link to={`/users/${user.id}`}>
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
                                    <a href="/users/martin/questions/">
                                        <i className="icon-book-open" />
                                        {user.numberOfQuestions}{' '}
                                        {t('common_questions')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/users/martin/answers/">
                                        <i className="icon-comment" />
                                        {user.numberOfAnswers}{' '}
                                        {t('common_answers')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/users/martin/best-answers/">
                                        <i className="icon-graduation-cap" />
                                        {user.numberOfBestAnswers}{' '}
                                        {t('answer_best_answers')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/users/martin/points/">
                                        <i className="icon-bucket" />
                                        {user.points} {t('common_points')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="user-follow-profile">
                            <Link to={`/users/${user.id}`}>
                                {t('common_view_profile')}
                            </Link>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default UserLogo;
