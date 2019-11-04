import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import DefaultUserLogo from '../../../images/default-user-logo.png';

const TopQuestions = ({ popularQuestions, questionsTopAnswered }) => {
  const { t } = useTranslation();

  const [isShown, setIsShown] = React.useState(true);

  const [isPopularTab, setIsPopularTab] = React.useState(true);

  React.useEffect(() => {
    setIsShown(true);
  }, [isPopularTab]);

  const popularClassName = isPopularTab ? 'tab current' : 'tab';
  const answerClassName = isPopularTab ? 'tab' : 'tab current';

  const questions = isPopularTab ? popularQuestions : questionsTopAnswered;

  return (
    <div className="widget tabs-wrap widget-tabs">
      <div className="widget-title widget-title-tabs">
        <ul className="tabs tabstabs-widget-2">
          <li className={popularClassName}>
            <a //eslint-disable-line jsx-a11y/anchor-is-valid
              onClick={() => setIsPopularTab(true)}
            >
              {t('common_popular')}
            </a>
          </li>
          <li className={answerClassName}>
            <a //eslint-disable-line jsx-a11y/anchor-is-valid
              onClick={() => setIsPopularTab(false)}
            >
              {t('common_answers')}
            </a>
          </li>
        </ul>
        <div
          className={`pi pi-chevron-${isShown ? 'down' : 'right'}`}
          onClick={() => setIsShown(state => !state)}
        />
      </div>
      <div className="widget-wrap">
        {isShown && (
          <div
            className="widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab"
            style={{ display: 'block' }}
          >
            <div className="user-notifications user-profile-area">
              <div>
                <ul>
                  {Object.values(questions).map((question, index) => {
                    const { askedBy } = question;
                    return (
                      <li
                        key={index}
                        className="widget-posts-text widget-no-img"
                      >
                        <span className="span-icon">
                          <Link to={`/users/${askedBy.id}`}>
                            <img
                              className="avatar avatar-20 photo"
                              alt={`${askedBy.firstName} ${askedBy.lastName}`}
                              width="20"
                              height="20"
                              src={askedBy.avatar || DefaultUserLogo}
                            />
                          </Link>
                        </span>
                        <div>
                          <h3>
                            <Link
                              to={`/home/question/${question.slug}/view`}
                              title={question.title}
                            >
                              {question.title}
                            </Link>
                          </h3>
                          <ul className="widget-post-meta">
                            <li>
                              <Link
                                to={`/home/question/${question.slug}/view`}
                                className="post-meta-comment"
                              >
                                <i className="icon-comment" />
                                {question.answerCount} {t('common_answers')}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopQuestions;

/* <div
                    className="tab-inner-wrap tab-inner-wraptabs-widget-2"
                    style={{ display: 'none' }}
                >
                    <div className="user-notifications user-profile-area">
                        <div>
                            <ul>
                                <li>
                                    <span className="span-icon">
                                        <a href="/users/martin/">
                                            <img
                                                className="avatar avatar-25 photo"
                                                alt="Martin Hope"
                                                title="Martin Hope"
                                                width="25"
                                                height="25"
                                                src="./Discy – Social Questions and Answers_files/team-2-25x25.jpg"
                                            />
                                        </a>
                                    </span>
                                    <div>
                                        <a href="/users/martin/">Martin Hope</a>{' '}
                                        added an answer{' '}
                                        <span className="question-title">
                                            <a href="/question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/#comment-72">
                                                They might be as confused as t
                                            </a>
                                        </span>
                                        <span className="notifications-date">
                                            April 19, 2018 at 2:07 am
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="span-icon">
                                        <a href="/users/marko/">
                                            <img
                                                className="avatar avatar-25 photo"
                                                alt="Marko Smith"
                                                title="Marko Smith"
                                                width="25"
                                                height="25"
                                                src="./Discy – Social Questions and Answers_files/team-4-25x25.jpg"
                                            />
                                        </a>
                                    </span>
                                    <div>
                                        <a href="/users/marko/">Marko Smith</a>{' '}
                                        added an answer{' '}
                                        <span className="question-title">
                                            <a href="/question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/#comment-71">
                                                I have never heard a British p
                                            </a>
                                        </span>
                                        <span className="notifications-date">
                                            April 19, 2018 at 2:07 am
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="span-icon">
                                        <a href="/users/john/">
                                            <img
                                                className="avatar avatar-25 photo"
                                                alt="John Peter"
                                                title="John Peter"
                                                width="25"
                                                height="25"
                                                src="./Discy – Social Questions and Answers_files/team-9-25x25.jpg"
                                            />
                                        </a>
                                    </span>
                                    <div>
                                        <a href="/users/john/">John Peter</a>{' '}
                                        added an answer{' '}
                                        <span className="question-title">
                                            <a href="/question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/#comment-69">
                                                Most British people understand
                                            </a>
                                        </span>
                                        <span className="notifications-date">
                                            April 19, 2018 at 2:07 am
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */
