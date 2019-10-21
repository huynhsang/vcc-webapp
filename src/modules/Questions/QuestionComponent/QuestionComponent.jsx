import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import RootScope from '../../../global/RootScope';
import { UserVoteQuestion } from '../../../domain/UserVoteQuestion';

import connect from 'react-redux/es/connect/connect';
import ApplicationUtil from '../../../common/util/ApplicationUtil';
import {
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../../actions/sweetAlert';
import CoreService from '../../../global/CoreService';

import UserLogo from '../../../component/UserLogo';
import Result from '../../../global/Result';

const { userVoteService } = CoreService;

const QuestionComponent = ({
    question,
    history,
    updateVoteQuestion,
    showErrorNotification,
    showConfirmToLogin
}) => {
    const { t } = useTranslation();

    const [loader, setLoader] = React.useState(null);

    const {
        id,
        askedBy,
        numberOfVotes,
        category,
        tags,
        hasAcceptedAnswer
    } = question;

    const isVotedBefore = question.votes && question.votes.length > 0;

    const handleVoteQuestion = isPositiveVote => {
        if (!RootScope.userId) {
            return showConfirmToLogin();
        }
        setLoader({ questionId: id });

        const data: UserVoteQuestion = {
            questionId: question.id,
            isPositiveVote
        };

        if (isVotedBefore) {
            data.id = question.votes[0].id;
            data.userId = question.votes[0].userId;
            userVoteService.reVoteQuestion(data).then((result: Result) => {
                if (result.success) {
                    updateVoteQuestion({
                        isPositiveVote,
                        numberOfVotes:
                            numberOfVotes + 2 * (isPositiveVote ? 1 : -1)
                    });
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        } else {
            userVoteService.voteQuestion(data).then((result: Result) => {
                if (result.success) {
                    updateVoteQuestion({
                        votes: [result.data],
                        numberOfVotes: numberOfVotes + (isPositiveVote ? 1 : -1)
                    });
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        }
    };

    const subCategories = tags ? JSON.parse(tags) : [];

    const bestAnswerClassName = hasAcceptedAnswer
        ? 'best-answer-meta meta-best-answer'
        : 'best-answer-meta';

    const disableUp = isVotedBefore && question.votes[0].isPositiveVote;
    const disableDown = isVotedBefore && !question.votes[0].isPositiveVote;
    const showLoader = loader && loader.questionId === question.id;

    return (
        <article className="article-question article-post clearfix question-vote-image question-type-normal post-118 question type-question status-publish hentry question-category-language question_tags-english question_tags-language">
            {/* <div className="question-sticky-ribbon">
            <div>Pinned</div>
            </div> */}
            <div className="single-inner-content">
                <div className="question-inner">
                    <div className="question-image-vote">
                        <UserLogo user={askedBy} />
                        <ul className="question-vote question-mobile">
                            <li className="question-vote-up">
                                <button
                                    className="wpqa_vote question_vote_up vote_allow"
                                    disabled={disableUp}
                                    onClick={() => handleVoteQuestion(true)}
                                >
                                    <i className="icon-up-dir" />
                                </button>
                            </li>
                            {showLoader ? (
                                <li
                                    className="li_loader"
                                    style={{
                                        display: 'block'
                                    }}
                                >
                                    <span className="loader_3 fa-spin" />
                                </li>
                            ) : (
                                <li
                                    className="vote_result"
                                    itemProp="upvoteCount"
                                >
                                    {question.numberOfVotes}
                                </li>
                            )}
                            <li className="question-vote-down">
                                <button
                                    className="wpqa_vote question_vote_down vote_allow"
                                    disabled={disableDown}
                                    onClick={() => handleVoteQuestion(false)}
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
                                    to={`/home/question/${question.slug}/view`}
                                    className="post-title"
                                >
                                    {question.title}
                                </Link>
                                <Link
                                    to={`/users/${askedBy.id}`}
                                    className="post-author"
                                    itemProp="url"
                                >
                                    {`${askedBy.firstName} ${askedBy.lastName}`}
                                </Link>
                                <span
                                    className="badge-span"
                                    style={{
                                        backgroundColor: '#30a96f'
                                    }}
                                >
                                    {askedBy.level}
                                </span>
                                <div className="post-meta">
                                    <span className="post-date">
                                        {`${t('common_asked')}: `}
                                        <time
                                            className="entry-date published"
                                            style={{ color: 'black' }}
                                            dateTime={question.createdOn}
                                        >
                                            {` ${new Date(
                                                question.createdOn
                                            ).toDateString()}`}
                                        </time>
                                    </span>
                                    <span className="byline">
                                        <span className="post-cat">
                                            {`${t('common_in')}: `}
                                            <span style={{ color: 'black' }}>
                                                {category.nameEn}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="question-not-mobile question-image-vote question-vote-sticky">
                        <div>
                            <ul className="question-vote">
                                <li className="question-vote-up">
                                    <button
                                        className="wpqa_vote question_vote_up vote_allow"
                                        disabled={disableUp}
                                        onClick={() => handleVoteQuestion(true)}
                                    >
                                        <i className="icon-up-dir" />
                                    </button>
                                </li>
                                {showLoader ? (
                                    <li
                                        className="li_loader"
                                        style={{
                                            display: 'block'
                                        }}
                                    >
                                        <span className="loader_3 fa-spin" />
                                    </li>
                                ) : (
                                    <li
                                        className="vote_result"
                                        itemProp="upvoteCount"
                                    >
                                        {question.numberOfVotes}
                                    </li>
                                )}
                                <li className="question-vote-down">
                                    <button
                                        className="wpqa_vote question_vote_down vote_allow"
                                        disabled={disableDown}
                                        onClick={() =>
                                            handleVoteQuestion(false)
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
                            {subCategories.length > 0 && (
                                <div className="tagcloud">
                                    <div className="question-tags">
                                        <i className="fas fa-tags" />
                                        {subCategories.map(
                                            (subCategory, count) => {
                                                return (
                                                    <Link
                                                        key={count}
                                                        to={`/comunity/${subCategory.slug}`}
                                                    >
                                                        {subCategory.nameEn}
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="wpqa_error" />
                        <footer className="question-footer">
                            <ul className="footer-meta">
                                <li className={bestAnswerClassName}>
                                    <i className="icon-comment" />
                                    <Link
                                        to={`/home/question/${question.slug}/view/#answers`}
                                    >{`${question.numberOfAnswers} `}</Link>
                                    <span className="question-span">
                                        <Link
                                            to={`/home/question/${question.slug}/view/#answers`}
                                        >
                                            Answers
                                        </Link>
                                    </span>
                                </li>
                                <li className="view-stats-meta">
                                    <i className="icon-eye" />
                                    {`${question.numberOfViews} `}
                                    <span className="question-span">
                                        {t('common_views')}
                                    </span>
                                </li>
                            </ul>
                            <Link
                                to={`/home/question/${question.slug}/view`}
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
};

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn())
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(QuestionComponent));