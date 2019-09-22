import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RootScope from '../../global/RootScope';
import ReactMarkdown from 'react-markdown';
import CoreService from '../../global/CoreService';
import UserLogo from '../../component/UserLogo';
import type {UserVoteAnswer} from "../../domain/UserVoteAnswer";
import Result from "../../global/Result";
import type {User} from "../../domain/User";

const { userVoteService, questionService } = CoreService;

const AnswerComponent = ({
    answer,
    question,
    updateQuestion,
    updateAnswer,
    history,
    showErrorNotification,
    showSuccessNotification,
}) => {
    const { t } = useTranslation();

    const [loader, setLoader] = React.useState(null);
    const [disableApproveBtn, setDisableApproveBtn] = React.useState(false);

    const answerBy: User = answer.answerBy;

    const isOwner: boolean = question.askedBy
        ? question.askedBy.id === RootScope.userId
        : false;
    const isVotedBefore: boolean = answer.votes && answer.votes.length > 0;

    const disableUp: boolean = isVotedBefore && answer.votes[0].isPositiveVote;
    const disableDown: boolean =
        isVotedBefore && !answer.votes[0].isPositiveVote;
    const showLoader: boolean = loader && loader.answerId === answer.id;
    const hideApprove: boolean = answer.answerBy === question.askedBy;

    const approveAnswer = () => {
        setDisableApproveBtn(true);
        questionService
            .doApproveAnswer(question.id, answer.id)
            .then((result: Result) => {
                if (result.success) {
                    setDisableApproveBtn(false);
                    updateQuestion({
                        ...question,
                        hasAcceptedAnswer: (answer.isTheBest = true),
                    });
                } else {
                    showErrorNotification(result.data);
                }
            });
    };

    const { numberOfVotes } = answer;

    const handleVoteAnswer = isPositiveVote => {
        if (!RootScope.userId) return history.push('/login');
        setLoader({ answerId: answer.id });
        const data: UserVoteAnswer = {
            answerId: answer.id,
            isPositiveVote,
        };
        if (isVotedBefore) {
            data.id = answer.votes[0].id;
            data.userId = answer.votes[0].userId;
            userVoteService.reVoteAnswer(data).then((result: Result) => {
                if (result.success) {
                    updateAnswer({
                        isPositiveVote,
                        numberOfVotes:
                            numberOfVotes + 2 * (isPositiveVote ? 1 : -1),
                    });
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        } else {
            userVoteService.voteAnswer(data).then((result: Result) => {
                if (result.success) {
                    updateAnswer({
                        votes: [result.data],
                        numberOfVotes:
                            numberOfVotes + 1 * (isPositiveVote ? 1 : -1),
                    });
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        }
    };

    return (
        <li className="comment byuser comment-author-james even thread-even depth-1">
            <div className="comment-body clearfix">
                <div className="comment-text">
                    <UserLogo user={answerBy} />
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
                                onClick={approveAnswer}
                            >
                                <i className="fas fa-check" /> {t('Approve')}
                            </button>
                        ) : (
                            ''
                        )}
                        <div className="comment-meta">
                            <div className="comment-author">
                                <span>
                                    <Link to={`/user-profile/${answerBy.id}`}>
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
                                    onClick={() => handleVoteAnswer(true)}
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
                                <li
                                    className="vote_result"
                                    itemProp="upvoteCount"
                                >
                                    {answer.numberOfVotes}
                                </li>
                            )}
                            <li className="dislike_answers">
                                <button
                                    className="wpqa_vote comment_vote_down vote_allow"
                                    disabled={disableDown}
                                    onClick={() => handleVoteAnswer(false)}
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
};

export default withRouter(AnswerComponent);
