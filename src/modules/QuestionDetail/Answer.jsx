import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import UserLogo from '../../component/UserLogo';

import { voteAnswerFn, approveAnswerFn } from '../../actions/questionDetail';
import Vote from '../../component/Vote2';

import { getIdAndToken } from '../../utils/cookie-tools';
import { Badge } from '../Badges';

import { showConfirmToLoginFn } from '../../actions/sweetAlert';
import AnswerShare from './AnswerShare';

const AnswerComponent = ({
    answer,
    question,
    showConfirmToLogin,
    voteAnswer,
    approveAnswer,
    questionDetail,
    isAuthenticated
}) => {
    const { t } = useTranslation();
    const { id: currentUserId } = getIdAndToken();

    const { votingAnswerId } = questionDetail;

    const { voted, upVoteCount, downVoteCount, answerBy } = answer;

    const [disableApproveBtn, setDisableApproveBtn] = React.useState(false);

    const isQuestionOwner =
        question.askedBy && question.askedBy.id === currentUserId;

    const isAnswerOwner = answerBy && answerBy.id === currentUserId;

    const approve = () => {
        setDisableApproveBtn(true);
        approveAnswer(question.id, answer.id);
    };

    const handleVoteAnswer = isPositiveVote => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteAnswer(answer.id, action);
    };

    return (
        <li className="comment" id={answer.id}>
            <div className="comment-body clearfix">
                <div className="comment-text">
                    <UserLogo user={answerBy} />
                    <div className="author clearfix">
                        {question.bestAnswerItem &&
                            answer.id === question.bestAnswerItem.id && (
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
                                    onClick={approve}
                                >
                                    <i className="fas fa-check" />{' '}
                                    {t('common_approve')}
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
                            disableUp={isAnswerOwner || voted === 'up'}
                            disableDown={isAnswerOwner || voted === 'down'}
                            isLoading={votingAnswerId === answer.id}
                            handleVote={handleVoteAnswer}
                            points={upVoteCount - downVoteCount}
                            isAnswerVote
                        />
                        <AnswerShare
                            questionSlug={question.slug}
                            answerId={answer.id}
                        />
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
    approveAnswer: (questionId, answerId) =>
        dispatch(approveAnswerFn(questionId, answerId)),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn())
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerComponent);
