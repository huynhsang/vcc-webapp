import React from 'react';
import PropTypes from 'prop-types';
import type { Answer } from '../../../domain/Answer';
import { Link } from 'react-router-dom';
import type { User } from '../../../domain/User';
import ReactMarkdown from 'react-markdown';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import RootScope from '../../../global/RootScope';

import { useTranslation } from 'react-i18next';

const AnswersUI = ({
  history,
  answers,
  createNewAnswer,
  question,
  updateQuestion,
  handleVoteAnswer,
  approveAnswer,
  isAuthenticated,
  leaveAnswerValidation,
}) => {
  const { t } = useTranslation();

  const [answersEditted, setAnswersEditted] = React.useState(answers);
  const [leaveAnswer, setLeaveAnswer] = React.useState(false);
  const [answerBody, setAnswerBody] = React.useState('');
  const [disableApproveBtn, setDisableApproveBtn] = React.useState(false);

  const [loader, setLoader] = React.useState(null);

  //TO DO: verify
  React.useEffect(() => {
    setAnswersEditted(answers);
  }, [answers]);

  const onSubmit = event => {
    event.preventDefault();
    createNewAnswer(
      answerBody,
      question.id,
      answersEditted,
      setAnswersEditted,
      setAnswerBody
    );
  };

  const triggerUpdateQuestion = question => {
    updateQuestion(question);
  };

  const handleChangeAnswerBody = value => {
    if (value.length < 10000) {
      setAnswerBody(value);
    }
  };

  const redirectTo = (path: string) => {
    history.push(path);
  };

  const isOwner: boolean = question.askedBy
    ? question.askedBy.id === RootScope.userId
    : false;

  return (
    <div className="question-adv-comments question-has-comments question-has-tabs">
      <div id="comments" className="post-section">
        <div className="post-inner">
          <div className="answers-tabs">
            <h3 className="section-title">
              <span>{question.numberOfAnswers} </span>
              {t('common_answers')}
            </h3>
            <div className="answers-tabs-inner">
              <ul>
                <li className="active-tab">
                  <Link to="?show=voted">{t('common_voted')}</Link>
                </li>
                <li>
                  <Link to="?show=oldest">{t('common_oldest')}</Link>
                </li>
                <li>
                  <Link to="?show=recent">{t('common_rencent')}</Link>
                </li>
              </ul>
            </div>
            <div className="clearfix" />
          </div>
          <ol className="commentlist clearfix custom-comment-list">
            {answersEditted.map((answer: Answer, index: number) => {
              const answerBy: User = answer.answerBy;

              const isVoted: boolean = answer.votes && answer.votes.length > 0;
              const disableUp: boolean =
                isVoted && answer.votes[0].isPositiveVote;
              const disableDown: boolean =
                isVoted && !answer.votes[0].isPositiveVote;
              const showLoader: boolean =
                loader && loader.answerId === answer.id;
              const hideApprove: boolean = answer.answerBy === question.askedBy;
              return (
                <li
                  key={index}
                  className="comment byuser comment-author-james even thread-even depth-1"
                >
                  <div className="comment-body clearfix">
                    <div className="comment-text">
                      <div className="author-image author-image-42">
                        <Link to={`/profile/${answerBy.id}`}>
                          <span className="author-image-span">
                            <img
                              className="avatar avatar-42 photo"
                              alt=""
                              title=""
                              width="42"
                              height="42"
                              src={answerBy.avatar}
                            />
                          </span>
                        </Link>
                        <div className="author-image-pop-2">
                          <div className="post-section user-area user-area-columns_pop">
                            <div className="post-inner">
                              <div className="author-image author-image-70">
                                <Link to={`/profile/${answerBy.id}`}>
                                  <span className="author-image-span">
                                    <img
                                      className="avatar avatar-70 photo"
                                      alt=""
                                      title=""
                                      width="70"
                                      height="70"
                                      src={answerBy.avatar}
                                    />
                                  </span>
                                </Link>
                              </div>
                              <div className="user-content">
                                <div className="user-inner">
                                  <div className="user-data-columns">
                                    <h4>
                                      <Link
                                        to={`/profile/${answerBy.id}`}
                                      >{`${answerBy.firstName} ${answerBy.lastName}`}</Link>
                                    </h4>
                                    <div className="user-data">
                                      <ul>
                                        <li className="city-country">
                                          <i className="icon-location" />
                                          {answerBy.nationality}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="user-columns-data">
                                <ul>
                                  <li className="user-columns-questions">
                                    <Link
                                      to={`/profile/${answerBy.id}/questions`}
                                    >
                                      <i className="icon-book-open" />
                                      {answerBy.numberOfQuestions} Questions
                                    </Link>
                                  </li>
                                  <li className="user-columns-answers">
                                    <Link
                                      to={`/profile/${answerBy.id}/answers`}
                                    >
                                      <i className="icon-comment" />
                                      {answerBy.numberOfAnswers} Answers
                                    </Link>
                                  </li>
                                  <li className="user-columns-best-answers">
                                    <Link
                                      to={`/profile/${answerBy.id}/answers/?show=best`}
                                    >
                                      <i className="icon-graduation-cap" />
                                      {answerBy.numberOfBestAnswers}{' '}
                                      {t('answer_best_answers')}
                                    </Link>
                                  </li>
                                  <li className="user-columns-points">
                                    <Link to={`/profile/${answerBy.id}`}>
                                      <i className="icon-bucket" />
                                      {answerBy.points} {t('common_points')}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <div className="user-follow-profile">
                                <Link to={`/profile/${answerBy.id}`}>
                                  {t('common_view_profile')}
                                </Link>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="author clearfix">
                        {question.hasAcceptedAnswer && answer.isTheBest ? (
                          <div className="best-answer">
                            {t('answer_best_answers')}
                          </div>
                        ) : (
                          ''
                        )}
                        {isOwner &&
                        !question.hasAcceptedAnswer &&
                        hideApprove ? (
                          <button
                            className="btn btn-approve"
                            disabled={disableApproveBtn}
                            onClick={() =>
                              approveAnswer(
                                question,
                                answer,
                                setDisableApproveBtn,
                                triggerUpdateQuestion
                              )
                            }
                          >
                            <i className="fas fa-check" /> {t('Approve')}
                          </button>
                        ) : (
                          ''
                        )}
                        <div className="comment-meta">
                          <div className="comment-author">
                            <span>
                              <Link to={`/profile/${answerBy.id}`}>
                                <span>{`${answerBy.firstName} ${answerBy.lastName}`}</span>
                              </Link>
                            </span>
                            <span
                              className="badge-span"
                              style={{ backgroundColor: '#ffbf00' }}
                            >
                              {answerBy.level}
                            </span>
                          </div>
                          <a href="" className="comment-date" itemProp="url">
                            <span itemProp="dateCreated">
                              Added an answer on{' '}
                              {new Date(answer.createdOn).toDateString()}
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="text">
                        <div itemProp="text">
                          <ReactMarkdown source={answer.body} />
                        </div>
                        <div className="clearfix" />
                        <div className="clearfix" />
                        <div className="wpqa_error" />
                        <ul className="question-vote answer-vote answer-vote-dislike">
                          <li>
                            <button
                              className="wpqa_vote comment_vote_up vote_allow"
                              disabled={disableUp}
                              onClick={() =>
                                handleVoteAnswer(
                                  answer,
                                  true,
                                  isVoted,
                                  setLoader,
                                  redirectTo
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
                              {answer.numberOfVotes}
                            </li>
                          )}
                          <li className="dislike_answers">
                            <button
                              className="wpqa_vote comment_vote_down vote_allow"
                              disabled={disableDown}
                              onClick={() =>
                                handleVoteAnswer(
                                  answer,
                                  false,
                                  isVoted,
                                  setLoader,
                                  redirectTo
                                )
                              }
                            >
                              <i className="icon-down-dir" />
                            </button>
                          </li>
                        </ul>
                        <ul className="comment-reply comment-reply-main">
                          <li>
                            <button
                              rel="nofollow"
                              className="comment-reply-link wpqa-reply-link"
                              aria-label={`Reply to ${answerBy.firstName} ${answerBy.lastName}`}
                            >
                              <i className="icon-reply" />
                              {t('common_reply')}
                            </button>
                          </li>
                          <li className="comment-share question-share question-share-2">
                            <i className="icon-share" /> {t('common_share')}
                            <div className="post-share">
                              <span>
                                <i className="icon-share" />
                                <span>{t('common_share')}</span>
                              </span>
                              <ul style={{ right: '-180px' }}>
                                <li className="share-facebook">
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://www.facebook.com/sharer.php?"
                                  >
                                    <i className="icon-facebook" />
                                    {t('share_on_facebook')}
                                  </a>
                                </li>
                                <li className="share-twitter">
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://twitter.com/share?"
                                  >
                                    <i className="icon-twitter" />
                                    {t('share_on_twitter')}
                                  </a>
                                </li>
                                <li className="share-linkedin">
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://www.linkedin.com/shareArticle?"
                                  >
                                    <i className="icon-linkedin" />
                                    {t('share_on_linkedIn')}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="clearfix last-item-answers" />
                        </ul>
                        <ul className="comment-reply comment-list-links">
                          <li className="question-list-details comment-list-details">
                            <i className="icon-dot-3" />
                            <ul>
                              <li className="report_activated">
                                <button className="report_c">
                                  <i className="icon-attention" />
                                  {t('common_report')}
                                </button>
                              </li>
                            </ul>
                          </li>
                          <li className="clearfix last-item-answers" />
                        </ul>
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="clearfix" />
        </div>
      </div>
      <div id="respond" className="comment-respond">
        {!leaveAnswer ? (
          <div
            className="button-default show-answer-form"
            onClick={() =>
              leaveAnswerValidation(isAuthenticated, setLeaveAnswer, redirectTo)
            }
          >
            {t('answer_leave_answer')}
          </div>
        ) : (
          <h3 className="section-title">{t('answer_leave_answer')}</h3>
        )}
        {leaveAnswer ? (
          <form
            id="commentform"
            className="post-section comment-form answers-form"
            onSubmit={onSubmit}
          >
            <SimpleMDEReact
              value={answerBody}
              onChange={handleChangeAnswerBody}
              options={{
                autofocus: true,
                spellChecker: false,
              }}
            />
            <p className="form-submit">
              <input
                name="submit"
                type="submit"
                id="submit"
                className="button-default button-hide-click"
                defaultValue="Submit"
              />
              <span className="clearfix" />
            </p>
          </form>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

AnswersUI.prototypes = {
  approveAnswer: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  createNewAnswer: PropTypes.func.isRequired,
  leaveAnswerValidation: PropTypes.func.isRequired,
  handleVoteAnswer: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AnswersUI;
