import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import type { Question } from '../../../domain/Question';
import type { Answer } from '../../../domain/Answer';
import type { User } from '../../../domain/User';
import type { SubCategory } from '../../../domain/SubCategory';
import AnswersUI from '../container/AnswersImpl';
import type { Category } from '../../../domain/Category';
import ReactMarkdown from 'react-markdown';

const ViewQuestion = ({
  match,
  history,
  getQuestionDetail,
  handleVoteQuestion,
}) => {
  const [question, setQuestion] = React.useState({});
  const [answers, setAnswers] = React.useState([]);

  const [loader, setLoader] = React.useState(null);

  const redirectTo = (path: string) => {
    history.push(path);
  };

  React.useEffect(()=>{
    const slug: string = match && match.params && match.params.slug;
    if (slug) {
      getQuestionDetail(match.params.slug, setQuestion, setAnswers, redirectTo);
    } else {
      history.push('/');
    }
  },[]);

  const updateQuestion = question => {
    setQuestion(question);
  };

  const askedBy: User = question.askedBy ? question.askedBy : {};
  const category: Category = question.category ? question.category : {};
  const subCategories: Array<SubCategory> = question.tags
    ? JSON.parse(question.tags)
    : [];
  const currentPath: string = history.location.pathname;

  const isVoted: boolean =
    question && question.votes && question.votes.length > 0;
  const disableUp: boolean = isVoted && question.votes[0].isPositiveVote;
  const disableDown: boolean = isVoted && !question.votes[0].isPositiveVote;
  const showLoader: boolean = loader && loader.questionId === question.id;

  const bestAnswerClassName = question.hasAcceptedAnswer
    ? 'best-answer-meta meta-best-answer'
    : 'best-answer-meta';
  return (
    <div className="discy-main-inner float_l">
      <div className="breadcrumbs">
        <span className="crumbs">
          <span typeof="v:Breadcrumb">
            <Link to="/">
              <i className="icon-home" />
              Home
            </Link>
            <span rel="v:child" typeof="v:Breadcrumb">
              <span className="crumbs-span"> / </span>
              <span className="current">
                <a href="/?show=recent-questions">Questions</a>
              </span>
              <span className="crumbs-span"> / </span>
              <span className="current">Q {question.id}</span>
            </span>
          </span>
        </span>
        <div className="breadcrumb-right">
          <div className="question-navigation">
            <Link className="nav-previous" to="/">
              <i className="icon-left-open" />
            </Link>
          </div>
          <div className="question-stats">
            {question.hasAcceptedAnswer ? (
              <span className="question-answered-done">
                <i className="icon-check" />
                Answered
              </span>
            ) : (
              <span>
                <i className="icon-flash" />
                In Process
              </span>
            )}
          </div>
          <div className="clearfix" />
        </div>
      </div>
      <div className="clearfix" />
      <div className="post-articles question-articles">
        <article className="article-question article-post clearfix question-vote-image question-type-normal question type-question status-publish hentry question-category-language question_tags-english question_tags-language">
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
                        alt={`${askedBy.firstName} ${askedBy.lastName}`}
                        title={`${askedBy.firstName} ${askedBy.lastName}`}
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
                                <Link
                                  to={`/profile/${askedBy.id}`}
                                >{`${askedBy.firstName} ${askedBy.lastName}`}</Link>
                              </h4>
                              <div className="user-data">
                                <ul>
                                  <li className="city-country">
                                    <i className="icon-location" />
                                    {`${askedBy.nationality}`}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="user-columns-data">
                          <ul>
                            <li className="user-columns-questions">
                              <Link to={`/profile/${askedBy.id}/questions`}>
                                <i className="icon-book-open" />
                                {askedBy.numberOfQuestions} Questions
                              </Link>
                            </li>
                            <li className="user-columns-answers">
                              <Link to={`/profile/${askedBy.id}/answers`}>
                                <i className="icon-comment" />
                                {askedBy.numberOfAnswers} Answers
                              </Link>
                            </li>
                            <li className="user-columns-best-answers">
                              <Link
                                to={`/profile/${askedBy.id}/answers?show=best-answers`}
                              >
                                <i className="icon-graduation-cap" />
                                {askedBy.numberOfBestAnswers} Best Answers
                              </Link>
                            </li>
                            <li className="user-columns-points">
                              <Link to={`/profile/${askedBy.id}`}>
                                <i className="icon-bucket" />
                                {askedBy.points} Points
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="user-follow-profile">
                          <Link to={`/profile/${askedBy.id}`}>
                            View Profile
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
                    <li className="li_loader" style={{ display: 'block' }}>
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
                    <span>
                      <Link
                        to={`/profile/${askedBy.id}`}
                        className="post-author"
                      >
                        <span itemProp="name">{`${askedBy.firstName} ${askedBy.lastName}`}</span>
                      </Link>
                    </span>
                    <span
                      className="badge-span"
                      style={{ backgroundColor: '#30a96f' }}
                    >
                      {askedBy.level}
                    </span>
                    <div className="post-meta">
                      <span className="post-date">
                        Asked
                        <span className="date-separator">:</span>
                        <Link to="/" itemProp="url">
                          <time
                            className="entry-date published"
                            dateTime={question.created}
                          >
                            {new Date(question.created).toDateString()}
                          </time>
                        </Link>
                      </span>
                      <span className="byline">
                        <span className="post-cat">
                          In:
                          <Link to={`/comunity/${category.slug}`} rel="tag">
                            Language
                          </Link>
                        </span>
                      </span>
                    </div>
                  </div>
                </header>
                <div itemProp="name">
                  <h1 className="post-title">{question.title}</h1>
                </div>
              </div>
              <div className="question-not-mobile question-image-vote question-vote-sticky">
                <div className="">
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
                      <li className="li_loader" style={{ display: 'block' }}>
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
                <div className="wpqa_error" />
                <div className="post-wrap-content">
                  <div className="question-content-text">
                    <div className="all_signle_question_content">
                      <div className="content-text" itemProp="text">
                        <ReactMarkdown source={question.body} />
                      </div>
                    </div>
                  </div>
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
                </div>
                <footer className="question-footer">
                  <ul className="footer-meta">
                    <li className={bestAnswerClassName}>
                      <i className="icon-comment" />
                      <span itemProp="answerCount" className="number">
                        <a href="#answers">{question.numberOfAnswers} </a>
                      </span>
                      <span className="question-span">
                        <a href="#answers">Answers</a>
                      </span>
                    </li>
                    <li className="view-stats-meta">
                      <i className="icon-eye" />
                      {question.numberOfViews}
                      <span className="question-span">Views</span>
                    </li>
                    {/*<li className="question-followers">*/}
                    {/*<i className="icon-users"/>*/}
                    {/*<span>9</span> Followers*/}
                    {/*</li>*/}
                    {/*<li className="question-favorites question-favorites-no-link">*/}
                    {/*<div className="small_loader loader_2"/>*/}
                    {/*<i className="icon-star"/><span>8</span>*/}
                    {/*</li>*/}
                  </ul>
                  <a className="meta-answer" href={`${currentPath}/#respond`}>
                    Answer
                  </a>
                </footer>
              </div>
              <div className="clearfix" />
            </div>
            <div className="question-bottom">
              <div className="post-share">
                <span>
                  <i className="icon-share" />
                  <span>Share</span>
                </span>
                <ul style={{ right: '-207px' }}>
                  <li className="share-facebook">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.facebook.com/share"
                    >
                      <i className="icon-facebook" />
                      Facebook
                    </a>
                  </li>
                  <li className="share-twitter">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://twitter.com/share"
                    >
                      <i className="icon-twitter" />
                    </a>
                  </li>
                  <li className="share-linkedin">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.linkedin.com/shareArticle?"
                    >
                      <i className="icon-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="question-link-list">
                <li className="report_activated">
                  <a className="report_q" href="">
                    <i className="icon-attention" />
                    Report
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
          </div>
          <AnswersUI
            answers={answers}
            question={question}
            redirect={history}
            updateQuestion={updateQuestion}
          />
        </article>
      </div>
    </div>
  );
};
ViewQuestion.prototypes = {
  getQuestionDetail: PropTypes.func.isRequired,
  loadMoreAnswers: PropTypes.func.isRequired,
  handleVoteQuestion: PropTypes.func.isRequired,
};

export default ViewQuestion;
