import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import ApplicationUtil from '../../common/util/ApplicationUtil';
import {
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../actions/sweetAlert';

import UserLogo from '../../component/UserLogo';

import isEmpty from 'lodash/isEmpty';

import { getNameByLanguage } from '../../utils/multiple-language';

import Vote from '../../component/Vote';
import { Badge } from '../Badges';
import { getIdAndToken } from '../../utils/cookie-tools';

import { voteQuestionFn, reVoteQuestionFn } from '../../actions/questionDetail';

const Wrapper = styled.article`
    .entry-date {
        color: black;
    }

    .post-cat span {
        color: black;
    }
    /* 
  .badge-span {
    background-color: #30a96f;
  } */
`;

const Question = ({
    question,
    history,
    showErrorNotification,
    showConfirmToLogin,
    isShownAnswerButton = true,
    isAuthenticated,
    voteQuestion,
    reVoteQuestion,
    questionDetail
}) => {
    const { t } = useTranslation();

    const { isVotingQuestion } = questionDetail;

    const {
        id,
        askedBy = {},
        body,
        categoryItem,
        bestAnswerItem,
        created,
        vote,
        upVoteCount,
        downVoteCount,
        answerCount,
        viewCount,
        slug,
        tagList
    } = question;

    const { id: currentUserId } = getIdAndToken();

    const handleVoteQuestion = isPositiveVote => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        const action = isPositiveVote ? 'up' : 'down';
        if (vote) {
            reVoteQuestion(id, vote.id, action);
        } else {
            voteQuestion(id, action);
        }
    };

    const bestAnswerClassName = bestAnswerItem
        ? 'best-answer-meta meta-best-answer'
        : 'best-answer-meta';

    const renderVote = isMobile => (
        <Vote
            disableUp={
                currentUserId === askedBy.id || (vote && vote.action === 'up')
            }
            disableDown={
                currentUserId === askedBy.id || (vote && vote.action === 'down')
            }
            isLoading={isVotingQuestion}
            handleVote={handleVoteQuestion}
            points={upVoteCount - downVoteCount}
            isMobile={isMobile}
        />
    );

    const tagsRender = (tagList || []).map(tag => (
        <a //eslint-disable-line jsx-a11y/anchor-is-valid
            key={tag.slug}
            // to={`/comunity/${tag.slug}`}
        >
            {getNameByLanguage(tag)}
        </a>
    ));

    return (
        <Wrapper className="article-question article-post clearfix question-vote-image question-type-normal post-118 question type-question status-publish hentry question-category-language question_tags-english question_tags-language">
            {/* <div className="question-sticky-ribbon">
            <div>Pinned</div>
            </div> */}
            <div className="single-inner-content">
                <div className="question-inner">
                    <div className="question-image-vote">
                        <UserLogo user={askedBy} />
                        {renderVote(true)}
                    </div>
                    <div className="question-content question-content-first">
                        <div className="question-header">
                            <Link
                                to={`/home/question/${slug}/view`}
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
                            <Badge points={askedBy.points} />
                            <div className="post-meta">
                                <span className="post-date">
                                    {`${t('common_asked')}: `}
                                    <time
                                        className="entry-date published"
                                        dateTime={created}
                                    >
                                        {` ${new Date(created).toDateString()}`}
                                    </time>
                                </span>
                                <span className="post-cat">
                                    {`${t('common_in')}: `}
                                    <span>
                                        {getNameByLanguage(categoryItem)}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="question-not-mobile question-image-vote question-vote-sticky">
                        {renderVote(false)}
                    </div>
                    <div className="question-content question-content-second">
                        <div className="post-wrap-content">
                            <div className="question-content-text">
                                <div className="all_not_signle_question_content">
                                    <ReactMarkdown source={body} />
                                </div>
                            </div>
                            {!isEmpty(tagsRender) && (
                                <div className="tagcloud">
                                    <div className="question-tags">
                                        <i className="fas fa-tags" />
                                        {tagsRender}
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
                                        to={`/home/question/${slug}/view/#answers`}
                                    >{`${answerCount} `}</Link>
                                    <span className="question-span">
                                        <Link
                                            to={`/home/question/${slug}/view/#answers`}
                                        >
                                            {t('common_answer')}
                                        </Link>
                                    </span>
                                </li>
                                <li className="view-stats-meta">
                                    <i className="icon-eye" />
                                    {`${viewCount} `}
                                    <span className="question-span">
                                        {t('common_views')}
                                    </span>
                                </li>
                            </ul>
                        </footer>
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
        </Wrapper>
    );
};

const mapStateToProps = ({ App: { isAuthenticated }, questionDetail }) => ({
    isAuthenticated,
    questionDetail
});

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn()),
    voteQuestion: (questionId, action) =>
        dispatch(voteQuestionFn(questionId, action)),
    reVoteQuestion: (questionId, voteId, action) =>
        dispatch(reVoteQuestionFn(questionId, voteId, action))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Question));
