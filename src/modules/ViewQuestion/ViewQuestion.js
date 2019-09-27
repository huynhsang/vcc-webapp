import React from 'react';
import connect from 'react-redux/es/connect/connect';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import type { Answer } from '../../../domain/Answer';
import type { User } from '../../../domain/User';
import type { SubCategory } from '../../../domain/SubCategory';
import AnswersUI from './AnswersUI';
import type { Category } from '../../../domain/Category';
import ReactMarkdown from 'react-markdown';

import produce from 'immer';

import { useTranslation } from 'react-i18next';
import UserLogo from '../../component/UserLogo';
import CoreService from '../../global/CoreService';
import { UserVoteQuestion } from '../../domain/UserVoteQuestion';
import ApplicationUtil from '../../common/util/ApplicationUtil';
import RootScope from '../../global/RootScope';

import {
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../actions/sweetAlert';

const { questionService, answerService, userVoteService } = CoreService;

const ViewQuestion = ({
    match,
    history,
    showErrorNotification,
    showConfirmToLogin
}) => {
    const { t } = useTranslation();

    const [question, setQuestion] = React.useState({});
    const [answers, setAnswers] = React.useState([]);

    const [loader, setLoader] = React.useState(null);

    const redirectTo = (path: string) => {
        history.push(path);
    };

    React.useEffect(() => {
        const slug: string = match && match.params && match.params.slug;
        if (slug) {
            questionService
                .findOneBySlug(match.params.slug)
                .then((result: Result) => {
                    if (
                        result.success &&
                        result.data &&
                        Object.keys(result.data).length > 0
                    ) {
                        setQuestion(result.data);
                        setAnswers(result.data.answers);
                    }
                });
        }
    }, []);

    const { numberOfVotes, votes } = question;
    const isVotedBefore = votes && votes.length > 0;

    const handleVoteQuestion = isPositiveVote => {
        if (!RootScope.userId) {
            return showConfirmToLogin();
        }
        setLoader({ questionId: question.id });
        const data: UserVoteQuestion = {
            questionId: question.id,
            isPositiveVote
        };

        //TO DO: Simplify this
        if (isVotedBefore) {
            data.id = question.votes[0].id;
            data.userId = question.votes[0].userId;
            userVoteService.reVoteQuestion(data).then((result: Result) => {
                if (result.success) {
                    setQuestion(
                        produce(draft => {
                            draft.votes[0].isPositiveVote = isPositiveVote;
                            draft.votes[0].numberOfVotes =
                                numberOfVotes + 2 * (isPositiveVote ? 1 : -1);
                        })
                    );
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        } else {
            userVoteService.voteQuestion(data).then((result: Result) => {
                if (result.success) {
                    setQuestion(
                        produce(draft => {
                            draft.votes = [result.data];
                            draft.votes[0].numberOfVotes =
                                numberOfVotes + (isPositiveVote ? 1 : -1);
                        })
                    );
                } else {
                    showErrorNotification(result.data);
                }
                setLoader(false);
            });
        }
    };

    const askedBy: User = question.askedBy ? question.askedBy : {};
    const category: Category = question.category ? question.category : {};
    const subCategories: Array<SubCategory> = question.tags
        ? JSON.parse(question.tags)
        : [];
    const currentPath: string = history.location.pathname;

    const disableUp: boolean =
        isVotedBefore && question.votes[0].isPositiveVote;
    const disableDown: boolean =
        isVotedBefore && !question.votes[0].isPositiveVote;
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
                            {t('common_home')}
                        </Link>
                        <span rel="v:child" typeof="v:Breadcrumb">
                            <span className="crumbs-span"> / </span>
                            <span className="current">
                                <a href="/?show=recent-questions">
                                    {t('common_questions')}
                                </a>
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
                                <UserLogo user={askedBy} />
                                <ul className="question-vote question-mobile">
                                    <li className="question-vote-up">
                                        <button
                                            className="wpqa_vote question_vote_up vote_allow"
                                            disabled={disableUp}
                                            onClick={() =>
                                                handleVoteQuestion(true)
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
                            <div className="question-content question-content-first">
                                <header className="article-header">
                                    <div className="question-header">
                                        <span>
                                            <Link
                                                to={`/user-profile/${askedBy.id}`}
                                                className="post-author"
                                            >
                                                <span itemProp="name">{`${askedBy.firstName} ${askedBy.lastName}`}</span>
                                            </Link>
                                        </span>
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
                                                {t('common_asked')}
                                                <span className="date-separator">
                                                    :
                                                </span>
                                                <Link to="/" itemProp="url">
                                                    <time
                                                        className="entry-date published"
                                                        dateTime={
                                                            question.created
                                                        }
                                                    >
                                                        {new Date(
                                                            question.createdOn
                                                        ).toDateString()}
                                                    </time>
                                                </Link>
                                            </span>
                                            <span className="byline">
                                                <span className="post-cat">
                                                    {t('common_in')}:
                                                    <Link
                                                        to={`/comunity/${category.slug}`}
                                                        rel="tag"
                                                    >
                                                        {t('common_language')}
                                                    </Link>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </header>
                                <div itemProp="name">
                                    <h1 className="post-title">
                                        {question.title}
                                    </h1>
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
                                                    handleVoteQuestion(true)
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
                                <div className="wpqa_error" />
                                <div className="post-wrap-content">
                                    <div className="question-content-text">
                                        <div className="all_signle_question_content">
                                            <div
                                                className="content-text"
                                                itemProp="text"
                                            >
                                                <ReactMarkdown
                                                    source={question.body}
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                </div>
                                <footer className="question-footer">
                                    <ul className="footer-meta">
                                        <li className={bestAnswerClassName}>
                                            <i className="icon-comment" />
                                            <span
                                                itemProp="answerCount"
                                                className="number"
                                            >
                                                <a href="#answers">
                                                    {question.numberOfAnswers}{' '}
                                                </a>
                                            </span>
                                            <span className="question-span">
                                                <a href="#answers">Answers</a>
                                            </span>
                                        </li>
                                        <li className="view-stats-meta">
                                            <i className="icon-eye" />
                                            {question.numberOfViews}
                                            <span className="question-span">
                                                {t('common_views')}
                                            </span>
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
                                    <a
                                        className="meta-answer"
                                        href={`${currentPath}/#respond`}
                                    >
                                        {t('common_answer')}
                                    </a>
                                </footer>
                            </div>
                            <div className="clearfix" />
                        </div>
                        <div className="question-bottom">
                            <div className="post-share">
                                <span>
                                    <i className="icon-share" />
                                    <span>{t('common_share')}</span>
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
                                        {t('common_report')}
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
                        updateQuestion={setQuestion}
                        updateAnswers={setAnswers}
                    />
                </article>
            </div>
        </div>
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
)(ViewQuestion);
