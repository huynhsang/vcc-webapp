import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import type { Filter } from '../../../../global/Filter';
import FilterBuilder from '../../../../global/Filter';
import type { User } from '../../../../domain/User';
import type { Question } from '../../../../domain/Question';
import type { Category } from '../../../../domain/Category';
import type { SubCategory } from '../../../../domain/SubCategory';
import ReactMarkdown from 'react-markdown';

import { useTranslation } from 'react-i18next';

const MainPage = ({ location, history, getQuestions, handleVoteQuestion }) => {

  const {t} = useTranslation();

  const [questions, setQuestions] = React.useState([]);
  const [show, setShow] = React.useState(null);
  const [loader, setLoader] = React.useState(null);
  const filter = FilterBuilder.buildPaginationFilter('createdOn DESC', 0, 10);

  const redirectTo = (path: string) => {
    history.push(path);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    getQuestions(
      filter,
      params.get('show'),
      redirectTo,
      questions,
      setQuestions,
      show,
      setShow
    );
  }, []);

  //Review, many effect on rendering
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (show && params.get('show') !== show) {
      filter.skip = 0;
      getQuestions(
        filter,
        params.get('show'),
        redirectTo,
        questions,
        setQuestions,
        show,
        setShow
      );
    }
  });

  const handleLoadMore = () => {
    filter.skip++;
    getQuestions(
      filter,
      show,
      redirectTo,
      questions,
      setQuestions,
      show,
      setShow
    );
  };

  const showLoadMore = questions.length >= (filter.skip + 1) * filter.limit;

  return (
    <div className="discy-main-inner float_l">
      <div className="clearfix" />
      <div id="row-tabs-home" className="row row-tabs">
        <div className="col col12">
          <div className="wrap-tabs">
            <div className="menu-tabs active-menu">
              <ul className="menu flex">
                <li className={show === 'recent-questions' ? 'active-tab' : ''}>
                  <Link to="?show=recent-questions">{t('mainpage_recent_question')}</Link>
                </li>
                <li className={show === 'most-answered' ? 'active-tab' : ''}>
                  <Link to="?show=most-answered">{t('mainpage_most_answerd')}</Link>
                </li>
                <li className={show === 'most-visited' ? 'active-tab' : ''}>
                  <Link to="?show=most-visited">{t('mainpage_most_visited')}</Link>
                </li>
                <li className="flexMenu-viewMore active">
                  <a title="">
                    <i className="icon-dot-3" />
                  </a>
                  <ul
                    className="flexMenu-popup"
                    style={{ display: 'none', position: 'absolute' }}
                  >
                    <li>
                      <Link to="?show=most-voted">{t('mainpage_most_voted')}</Link>
                    </li>
                    <li>
                      <Link to="?show=no-answers">{t('mainpage_no_answers')}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section>
        <h2 className="screen-reader-text">VC&C Latest Questions</h2>
        <div className="post-articles question-articles">
          {questions.map((question: Question, index) => {
            const askedBy: User = question.askedBy;
            const category: Category = question.category;
            const subCategories: Array<SubCategory> = question.tags
              ? JSON.parse(question.tags)
              : [];
            const bestAnswerClassName = question.hasAcceptedAnswer
              ? 'best-answer-meta meta-best-answer'
              : 'best-answer-meta';

            const isVoted: boolean =
              question.votes && question.votes.length > 0;
            const disableUp: boolean =
              isVoted && question.votes[0].isPositiveVote;
            const disableDown: boolean =
              isVoted && !question.votes[0].isPositiveVote;
            const showLoader: boolean =
              loader && loader.questionId === question.id;
            return (
              <article
                key={index}
                className="article-question article-post clearfix question-vote-image question-type-normal post-118 question type-question status-publish hentry question-category-language question_tags-english question_tags-language"
              >
                {/*<div className="question-sticky-ribbon">*/}
                {/*<div>Pinned</div>*/}
                {/*</div>*/}
                <div className="single-inner-content">
                  <div className="question-inner">
                    <div className="question-image-vote">
                      <div className="author-image author-image-42">
                        <Link to={`/profile/${askedBy.id}`}>
                          <span className="author-image-span">
                            <img
                              className="avatar avatar-42 photo"
                              alt="Martin Hope"
                              title="Martin Hope"
                              width="42"
                              height="42"
                              src={askedBy.avatar}
                            />
                          </span>
                        </Link>
                        <div className="author-image-pop-2">
                          <div className="post-section user-area user-area-columns_pop">
                            <div className="post-inner">
                              <div className="author-image author-image-70">
                                <Link to={`/profile/${askedBy.id}`}>
                                  <span className="author-image-span">
                                    <img
                                      className="avatar avatar-70 photo"
                                      alt=""
                                      title=""
                                      width="70"
                                      height="70"
                                      src={askedBy.avatar}
                                    />
                                  </span>
                                </Link>
                              </div>
                              <div className="user-content">
                                <div className="user-inner">
                                  <div className="user-data-columns">
                                    <h4>
                                      <Link to={`/profile/${askedBy.id}`}>
                                        {`${askedBy.firstName} ${askedBy.lastName}`}
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
                                  <li className="user-columns-questions">
                                    <a href="/profile/martin/questions/">
                                      <i className="icon-book-open" />
                                      {askedBy.numberOfQuestions} {t('common_questions')}
                                    </a>
                                  </li>
                                  <li className="user-columns-answers">
                                    <a href="/profile/martin/answers/">
                                      <i className="icon-comment" />
                                      {askedBy.numberOfAnswers} {t('common_answers')}
                                    </a>
                                  </li>
                                  <li className="user-columns-best-answers">
                                    <a href="/profile/martin/best-answers/">
                                      <i className="icon-graduation-cap" />
                                      {askedBy.numberOfBestAnswers} {t('answer_best_answers')}
                                    </a>
                                  </li>
                                  <li className="user-columns-points">
                                    <a href="/profile/martin/points/">
                                      <i className="icon-bucket" />
                                      {askedBy.points} {t('common_points')}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="user-follow-profile">
                                <Link to={`/profile/${askedBy.id}`}>
                                  {t('common_view_profile')}
                                </Link>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="question-vote question-mobile">
                        <li className="question-vote-up">
                          <button
                            className="wpqa_vote question_vote_up vote_allow"
                            disabled={disableUp}
                            onClick={() =>
                              handleVoteQuestion(
                                question,
                                true,
                                isVoted,
                                redirectTo,
                                setLoader
                              )
                            }
                          >
                            <i className="icon-up-dir" />
                          </button>
                        </li>
                        {showLoader ? (
                          <li
                            className="li_loader"
                            style={{ display: 'block' }}
                          >
                            <span className="loader_3 fa-spin" />
                          </li>
                        ) : (
                          <li className="vote_result" itemProp="upvoteCount">
                            {question.numberOfVotes}
                          </li>
                        )}
                        <li className="question-vote-down">
                          <button
                            className="wpqa_vote question_vote_down vote_allow"
                            disabled={disableDown}
                            onClick={() =>
                              handleVoteQuestion(
                                question,
                                false,
                                isVoted,
                                redirectTo,
                                setLoader
                              )
                            }
                          >
                            <i className="icon-down-dir" />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="question-content question-content-first">
                      <header className="article-header">
                        <div className="question-header">
                          <Link
                            to={`/profile/${askedBy.id}`}
                            className="post-author"
                            itemProp="url"
                          >
                            {`${askedBy.firstName} ${askedBy.lastName}`}
                          </Link>
                          <span
                            className="badge-span"
                            style={{ backgroundColor: '#30a96f' }}
                          >
                            {askedBy.level}
                          </span>
                          <div className="post-meta">
                            <span className="post-date">
                              {t('common_asked')}
                              <span className="date-separator">:</span>
                              <Link
                                to={`/question/${question.slug}/view`}
                                itemProp="url"
                              >
                                <time
                                  className="entry-date published"
                                  dateTime={question.createdOn}
                                >
                                  {` ${new Date(
                                    question.createdOn
                                  ).toDateString()}`}
                                </time>
                              </Link>
                            </span>
                            <span className="byline">
                              <span className="post-cat">
                                {t('common_in')}:
                                <Link
                                  to={`/community/${category.slug}`}
                                  rel="tag"
                                >
                                  {category.nameEn}
                                </Link>
                              </span>
                            </span>
                          </div>
                        </div>
                      </header>
                      <div>
                        <h2 className="post-title">
                          <Link
                            to={`/question/${question.slug}/view`}
                            className="post-title"
                          >
                            {question.title}
                          </Link>
                        </h2>
                      </div>
                    </div>
                    <div className="question-not-mobile question-image-vote question-vote-sticky">
                      <div>
                        <ul className="question-vote">
                          <li className="question-vote-up">
                            <button
                              className="wpqa_vote question_vote_up vote_allow"
                              disabled={disableUp}
                              onClick={() =>
                                handleVoteQuestion(
                                  question,
                                  true,
                                  isVoted,
                                  redirectTo,
                                  setLoader
                                )
                              }
                            >
                              <i className="icon-up-dir" />
                            </button>
                          </li>
                          {showLoader ? (
                            <li
                              className="li_loader"
                              style={{ display: 'block' }}
                            >
                              <span className="loader_3 fa-spin" />
                            </li>
                          ) : (
                            <li className="vote_result" itemProp="upvoteCount">
                              {question.numberOfVotes}
                            </li>
                          )}
                          <li className="question-vote-down">
                            <button
                              className="wpqa_vote question_vote_down vote_allow"
                              disabled={disableDown}
                              onClick={() =>
                                handleVoteQuestion(
                                  question,
                                  false,
                                  isVoted,
                                  redirectTo,
                                  setLoader
                                )
                              }
                            >
                              <i className="icon-down-dir" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="question-content question-content-second">
                      <div className="post-wrap-content">
                        <div className="question-content-text">
                          <div className="all_not_signle_question_content">
                            <ReactMarkdown source={question.body} />
                          </div>
                        </div>
                        {subCategories.length > 0 ? (
                          <div className="tagcloud">
                            <div className="question-tags">
                              <i className="fas fa-tags" />
                              {subCategories.map((subCategory, count) => {
                                return (
                                  <Link
                                    key={count}
                                    to={`/comunity/${subCategory.slug}`}
                                  >
                                    {subCategory.nameEn}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="wpqa_error" />
                      <footer className="question-footer">
                        <ul className="footer-meta">
                          <li className={bestAnswerClassName}>
                            <i className="icon-comment" />
                            <Link
                              to={`/question/${question.slug}/view/#answers`}
                            >{`${question.numberOfAnswers} `}</Link>
                            <span className="question-span">
                              <Link
                                to={`/question/${question.slug}/view/#answers`}
                              >
                                Answers
                              </Link>
                            </span>
                          </li>
                          <li className="view-stats-meta">
                            <i className="icon-eye" />
                            {`${question.numberOfViews} `}
                            <span className="question-span">{t('common_views')}</span>
                          </li>
                        </ul>
                        <Link
                          to={`/question/${question.slug}/view`}
                          className="meta-answer"
                        >
                          {t('common_answer')}
                        </Link>
                      </footer>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="pagination-wrap pagination-question">
          <div className="pagination-nav posts-load-more">
            <span className="load_span">
              <span className="loader_2" />
            </span>
            {showLoadMore ? (
              <div className="load-more">
                <a onClick={handleLoadMore}>{t('mainpage_load_more_questions')}</a>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

MainPage.prototypes = {
  getQuestions: PropTypes.func.isRequired,
  handleVoteQuestion: PropTypes.func.isRequired,
};

export default withRouter(MainPage);
