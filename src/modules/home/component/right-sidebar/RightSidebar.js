import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import type { Filter } from '../../../../global/Filter';
import FilterBuilder from '../../../../global/Filter';
import type { User } from '../../../../domain/User';
import type { Question } from '../../../../domain/Question';
import type { SubCategory } from '../../../../domain/SubCategory';

//TO DO: List popular, list Answers
const RightSidebar = ({
  getTopUsers,
  getTopPopularQuestions,
  getQuestionsWithTopAnswers,
  getTopTrendingTags,
}) => {

  const { t } = useTranslation();

  const [topUsers, setTopUsers] = React.useState([]);
  const [popularQuestions, setPopularQuestions] = React.useState([]);
  const [questionsWithTopAnswers, setQuestionsWithTopAnswers] = React.useState(
    []
  );
  const [trendingTags, setTrendingTags] = React.useState([]);

  const [isPopularTab, setIsPopularTab] = React.useState(true);

  React.useEffect(() => {
    const topUsersFilter: Filter = FilterBuilder.buildPaginationFilter(
      null,
      0,
      5
    );
    const popularQuestionsFilter: Filter = FilterBuilder.buildPaginationFilter(
      null,
      0,
      5
    );
    const qaFilter: Filter = FilterBuilder.buildPaginationFilter(null, 0, 5);
    const trendingTagsFilter: Filter = FilterBuilder.buildPaginationFilter(
      null,
      0,
      5
    );

    getTopUsers(topUsersFilter, setTopUsers);
    getTopPopularQuestions(popularQuestionsFilter, setPopularQuestions);
    getQuestionsWithTopAnswers(qaFilter, setQuestionsWithTopAnswers);
    getTopTrendingTags(trendingTagsFilter, setTrendingTags);
  }, []);

  const popularClassName = isPopularTab ? 'tab current' : 'tab';
  const answerClassName = isPopularTab ? 'tab' : 'tab current';
  const questions: Array<Question> = isPopularTab
    ? popularQuestions
    : questionsWithTopAnswers;

  return (
    <aside
      className="sidebar sidebar-width float_l fixed-sidebar"
      style={{
        position: 'relative',
        overflow: 'visible',
        minHeight: '1px',
      }}
    >
      <div
        className="theiaStickySidebar"
        style={{
          paddingTop: '0px',
          paddingBottom: '1px',
          position: 'static',
          top: '0px',
          left: '1026px',
        }}
      >
        <h3 className="screen-reader-text">{t('common_slidebar')}</h3>
        <div className="inner-sidebar">
          <div className="widget widget_ask">
            <Link to="/question/add" className="button-default wpqa-question">
              {t('home_ask_a_question')}
            </Link>
          </div>
          <section
            id="stats-widget-2"
            className="widget-no-divider widget stats-widget"
          >
            <h3 className="screen-reader-text">{t('common_stats')}</h3>
            <div className="widget-wrap">
              <ul className="stats-inner">
                <li className="stats-questions">
                  <div>
                    <span className="stats-text">{t('common_questions')}</span>
                    <span className="stats-value">21</span>
                  </div>
                </li>
                <li className="stats-answers">
                  <div>
                    <span className="stats-text">{t('common_answers')}</span>
                    <span className="stats-value">69</span>
                  </div>
                </li>
                <li className="stats-best_answers">
                  <div>
                    <span className="stats-text">{t('nav_best_answers')}</span>
                    <span className="stats-value">10</span>
                  </div>
                </li>
                <li className="stats-users">
                  <div>
                    <span className="stats-text">{t('common_users')}</span>
                    <span className="stats-value">118</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <div className="widget tabs-wrap widget-tabs">
            <div className="widget-title widget-title-tabs">
              <ul className="tabs tabstabs-widget-2">
                <li className={popularClassName}>
                  <a onClick={() => setIsPopularTab(true)}>{t('common_popular')}</a>
                </li>
                <li className={answerClassName}>
                  <a onClick={() => setIsPopularTab(false)}>{t('common_answers')}</a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            <div className="widget-wrap">
              <div
                className="widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab"
                style={{ display: 'block' }}
              >
                <div className="user-notifications user-profile-area">
                  <div>
                    <ul>
                      {questions.map((question: Question, index) => {
                        const askedBy: User = question.askedBy;
                        return (
                          <li
                            key={index}
                            className="widget-posts-text widget-no-img"
                          >
                            <span className="span-icon">
                              <Link to={`/profile/${askedBy.id}`}>
                                <img
                                  className="avatar avatar-20 photo"
                                  alt={`${askedBy.firstName} ${askedBy.lastName}`}
                                  width="20"
                                  height="20"
                                  src={askedBy.avatar}
                                />
                              </Link>
                            </span>
                            <div>
                              <h3>
                                <Link
                                  to={`/question/${question.slug}/view`}
                                  title={question.title}
                                >
                                  {question.title}
                                </Link>
                              </h3>
                              <ul className="widget-post-meta">
                                <li>
                                  <Link
                                    to={`/question/${question.slug}/view`}
                                    className="post-meta-comment"
                                  >
                                    <i className="icon-comment" />
                                    {question.numberOfAnswers} {t('common_answers')}
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
              <div
                className="tab-inner-wrap tab-inner-wraptabs-widget-2"
                style={{ display: 'none' }}
              >
                <div className="user-notifications user-profile-area">
                  <div>
                    <ul>
                      <li>
                        <span className="span-icon">
                          <a href="/profile/martin/">
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
                          <a href="/profile/martin/">Martin Hope</a> added an
                          answer{' '}
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
                          <a href="/profile/marko/">
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
                          <a href="/profile/marko/">Marko Smith</a> added an
                          answer{' '}
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
                          <a href="/profile/john/">
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
                          <a href="/profile/john/">John Peter</a> added an
                          answer{' '}
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
              </div>
            </div>
          </div>
          <section id="users-widget-2" className="widget users-widget">
            <h2 className="widget-title">
              <i className="icon-folder" />
              {t('top_members')}
            </h2>
            <div className="widget-wrap">
              <div className="user-section user-section-small row user-not-normal">
                {topUsers.map((user: User, index) => {
                  return (
                    <div key={index} className="col col12">
                      <div className="post-section user-area user-area-small">
                        <div className="post-inner">
                          <div className="author-image author-image-42">
                            <Link to={`/profile/${user.id}`}>
                              <span className="author-image-span">
                                <img
                                  className="avatar avatar-42 photo"
                                  alt=""
                                  title=""
                                  width="42"
                                  height="42"
                                  src={user.avatar}
                                />
                              </span>
                            </Link>
                          </div>
                          <div className="user-content">
                            <div className="user-inner">
                              <h4>
                                <Link to={`/profile/${user.id}`}>
                                  {user.firstName} {user.lastName}
                                </Link>
                              </h4>
                              <div className="user-data">
                                <ul>
                                  <li className="user-questions">
                                    <a href="/profile/marko/questions/">
                                      {user.numberOfQuestions} {t('common_questions')}
                                    </a>
                                  </li>
                                  <li className="user-points">
                                    <a href="/profile/marko/points/">
                                      {user.points} {t('common_points')}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <span
                                className="badge-span"
                                style={{ backgroundColor: '#d9a34a' }}
                              >
                                {user.level}
                              </span>
                            </div>
                          </div>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section id="tag_cloud-2" className="widget widget_tag_cloud">
            <h2 className="widget-title">
              <i className="icon-folder" />
              Trending Tags
            </h2>
            <div className="tagcloud">
              {trendingTags.map((tag: SubCategory, index) => {
                return (
                  <Link
                    key={index}
                    to={`/questions?tags=${tag.slug}`}
                    className="tag-cloud-link tag-link-11 tag-link-position-1"
                  >
                    {tag.nameEn}
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};

RightSidebar.propTypes = {
  getTopUsers: PropTypes.func.isRequired,
  getTopPopularQuestions: PropTypes.func.isRequired,
  getQuestionsWithTopAnswers: PropTypes.func.isRequired,
  getTopTrendingTags: PropTypes.func.isRequired,
};

export default RightSidebar;
