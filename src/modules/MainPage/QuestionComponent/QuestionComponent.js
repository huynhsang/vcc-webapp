import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Question } from '../../../domain/Question';
import RootScope from '../../../global/RootScope';
import { UsersVoteQuestions } from '../../../domain/UsersVoteQuestions';

import connect from 'react-redux/es/connect/connect';
import ApplicationUtil from '../../../common/util/ApplicationUtil';
import { showErrorAlertFn } from '../../../actions/sweetAlert';
import CoreService from '../../../global/CoreService';

import UserLogo from '../../../component/UserLogo';

const usersVoteService = CoreService.usersVoteService;

const QuestionComponent = ({
    question,
    history,
    updateVoteQuestion,
    showErrorNotification,
}) => {
    const { t } = useTranslation();

    const [loader, setLoader] = React.useState(null);

    const redirectTo = (path: string) => {
        history.push(path);
    };

    const { id, askedBy, numberOfVotes } = question;

    const handleVoteQuestion = (isPositiveVote, isVotedBefore) => {
        if (!RootScope.userId) return history.push('/login');
        setLoader({ questionId: id });

        const data: UsersVoteQuestions = {
            questionId: question.id,
            isPositiveVote,
        };

        if (isVotedBefore) {
            data.id = question.votes[0].id;
            data.userId = question.votes[0].userId;
            usersVoteService.reVoteQuestion(data).then((result: Result) => {
                if (result.success) {
                    updateVoteQuestion({
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
            usersVoteService.voteQuestion(data).then((result: Result) => {
                if (result.success) {
                    updateVoteQuestion({
                        votes: [result.data],
                        numberOfVotes:
                            numberOfVotes + (isPositiveVote ? 1 : -1),
                    });
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        }
    };

    const category: Category = question.category;
    const subCategories: Array<SubCategory> = question.tags
        ? JSON.parse(question.tags)
        : [];
    const bestAnswerClassName = question.hasAcceptedAnswer
        ? 'best-answer-meta meta-best-answer'
        : 'best-answer-meta';

    const isVoted: boolean = question.votes && question.votes.length > 0;
    const disableUp: boolean = isVoted && question.votes[0].isPositiveVote;
    const disableDown: boolean = isVoted && !question.votes[0].isPositiveVote;
    const showLoader: boolean = loader && loader.questionId === question.id;
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
                                    onClick={() =>
                                        handleVoteQuestion(true, isVoted)
                                    }
                                >
                                    <i className="icon-up-dir" />
                                </button>
                            </li>
                            {showLoader ? (
                                <li
                                    className="li_loader"
                                    style={{
                                        display: 'block',
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
                                        handleVoteQuestion(false, isVoted)
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
                                    style={{
                                        backgroundColor: '#30a96f',
                                    }}
                                >
                                    {askedBy.level}
                                </span>
                                <div className="post-meta">
                                    <span className="post-date">
                                        {t('common_asked')}
                                        <span className="date-separator">
                                            :
                                        </span>
                                        <Link
                                            to={`/home/question/${question.slug}/view`}
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
                                    to={`/home/question/${question.slug}/view`}
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
                                            handleVoteQuestion(true, isVoted)
                                        }
                                    >
                                        <i className="icon-up-dir" />
                                    </button>
                                </li>
                                {showLoader ? (
                                    <li
                                        className="li_loader"
                                        style={{
                                            display: 'block',
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
                                            handleVoteQuestion(false, isVoted)
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
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(QuestionComponent));
