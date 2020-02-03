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

import Vote from '../../component/Vote2';
import { Badge } from '../Badges';
import { getIdAndToken } from '../../utils/cookie-tools';

import { voteQuestionFn } from '../../actions/questions';

import Tag from '../../component/Tag';

const Wrapper = styled.article`
    .entry-date {
        color: black;
    }

    .post-cat span {
        color: black;
    }
`;

const Question = ({
    question,
    showConfirmToLogin,
    isAuthenticated,
    voteQuestion,
    questionsReducer
}) => {
    const { t } = useTranslation();

    const { votingQuestionId } = questionsReducer;

    const {
        id,
        askedBy = {},
        body,
        categoryItem,
        bestAnswerItem,
        created,
        upVoteCount,
        downVoteCount,
        answerCount,
        viewCount,
        slug,
        tagList,
        voted
    } = question;

    const { id: currentUserId } = getIdAndToken();

    const handleVoteQuestion = isPositiveVote => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteQuestion(id, action);
    };

    const bestAnswerClassName = bestAnswerItem
        ? 'best-answer-meta meta-best-answer'
        : 'best-answer-meta';

    const renderVote = isMobile => (
        <Vote
            disableUp={currentUserId === askedBy.id || voted === 'up'}
            disableDown={currentUserId === askedBy.id || voted === 'down'}
            isLoading={votingQuestionId === question.id}
            handleVote={handleVoteQuestion}
            points={upVoteCount - downVoteCount}
            isMobile={isMobile}
        />
    );

    const tagsRender = (tagList || []).map(tag => (
        <Tag key={tag.id} tag={tag} />
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
                                to={`/homes/question/${slug}/view`}
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
                                        to={`/homes/question/${slug}/view/#answers`}
                                    >{`${answerCount} `}</Link>
                                    <span className="question-span">
                                        <Link
                                            to={`/homes/question/${slug}/view/#answers`}
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
                            <Link
                                to={`/homes/question/${slug}/view`}
                                className="meta-answer"
                            >
                                {t('common_answer')}
                            </Link>
                        </footer>
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
        </Wrapper>
    );
};

const mapStateToProps = ({ App: { isAuthenticated }, questionsReducer }) => ({
    isAuthenticated,
    questionsReducer
});

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn()),
    voteQuestion: (questionId, action) =>
        dispatch(voteQuestionFn(questionId, action))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Question));
