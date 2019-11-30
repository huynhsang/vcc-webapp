import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import UserLogo from '../../component/UserLogo';

import { approveAnswer } from '../../services/question.service';
import { voteAnswerFn, reVoteAnswerFn } from '../../actions/questionDetail';
import Vote from '../../component/Vote';

import { getIdAndToken } from '../../utils/cookie-tools';
import { Badge } from '../Badges';
import ApplicationUtil from '../../common/util/ApplicationUtil';

import {
    showErrorAlertFn,
    showConfirmToLoginFn,
    showSuccessAlertFn
} from '../../actions/sweetAlert';

const AnswerComponent = ({
    answer,
    question,
    updateQuestion,
    history,
    showErrorNotification,
    showSuccessNotification,
    showConfirmToLogin,
    voteAnswer,
    reVoteAnswer,
    questionDetail,
    isAuthenticated
}) => {
    const { t } = useTranslation();
    const { id: currentUserId } = getIdAndToken();

    const { votingAnswerId } = questionDetail;

    const { votes = [], upVoteCount, downVoteCount, answerBy } = answer;

    const [disableApproveBtn, setDisableApproveBtn] = React.useState(false);

    const isQuestionOwner =
        question.askedBy && question.askedBy.id === currentUserId;

    const lastVote = votes.find(vote => vote.ownerId === currentUserId);

    const isAnswerOwner = answerBy && answerBy.id === currentUserId;

    const approveAnswerFn = () => {
        setDisableApproveBtn(true);
        approveAnswer(question.id, answer.id)
            .then(() => {
                setDisableApproveBtn(false);
                // updateQuestion({
                //     ...question,
                //     hasAcceptedAnswer: (answer.isTheBest = true)
                // });
            })
            .catch(err => {
                showErrorNotification(err.response.data);
            });
    };

    const handleVoteAnswer = isPositiveVote => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        const action = isPositiveVote ? 'up' : 'down';

        if (lastVote) {
            reVoteAnswer(answer.id, lastVote.id, action);
        } else {
            voteAnswer(answer.id, action);
        }
    };

    return (
        <li className="comment byuser comment-author-james even thread-even depth-1">
            <div className="comment-body clearfix">
                <div className="comment-text">
                    <UserLogo user={answerBy} />
                    <div className="author clearfix">
                        {question.bestAnswerItem && answer.isTheBest && (
                            <div className="best-answer">
                                {t('answer_best_answers')}
                            </div>
                        )}
                        {isQuestionOwner &&
                            !question.bestAnswerItem &&
                            !isAnswerOwner && (
                                <button
                                    className="btn btn-approve"
                                    disabled={disableApproveBtn}
                                    onClick={approveAnswerFn}
                                >
                                    <i className="fas fa-check" />{' '}
                                    {t('Approve')}
                                </button>
                            )}
                        <div className="comment-meta">
                            <div className="comment-author">
                                <Link to={`/users/${answerBy.id}`}>
                                    <span>{`${answerBy.firstName} ${answerBy.lastName}`}</span>
                                </Link>
                                <Badge points={answerBy.points} />
                            </div>
                            <a //eslint-disable-line jsx-a11y/anchor-is-valid
                                className="comment-date"
                                itemProp="url"
                            >
                                <span itemProp="dateCreated">
                                    Added an answer on{' '}
                                    {new Date(answer.created).toDateString()}
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
                        <Vote
                            disableUp={
                                isAnswerOwner ||
                                (lastVote && lastVote.action === 'up')
                            }
                            disableDown={
                                isAnswerOwner ||
                                (lastVote && lastVote.action === 'down')
                            }
                            isLoading={votingAnswerId === answer.id}
                            handleVote={handleVoteAnswer}
                            points={upVoteCount - downVoteCount}
                            isAnswerVote
                        />
                        <ul className="comment-reply comment-reply-main">
                            {/* <li>
                                <button
                                    rel="nofollow"
                                    className="comment-reply-link wpqa-reply-link"
                                    aria-label={`Reply to ${answerBy.firstName} ${answerBy.lastName}`}
                                >
                                    <i className="icon-reply" />
                                    {t('common_reply')}
                                </button>
                            </li> */}
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
                        {/* <ul className="comment-reply comment-list-links">
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
                        </ul> */}
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
        </li>
    );
};

const mapStateToProps = ({ questionDetail, App: { isAuthenticated } }) => ({
    questionDetail,
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    voteAnswer: (answerId, action) => dispatch(voteAnswerFn(answerId, action)),
    reVoteAnswer: (answerId, voteId, action) =>
        dispatch(reVoteAnswerFn(answerId, voteId, action)),
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn()),
    showSuccessNotification: (title, text) =>
        dispatch(showSuccessAlertFn(title, text))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswerComponent));