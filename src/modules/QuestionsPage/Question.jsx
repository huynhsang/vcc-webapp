import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';

import isEmpty from 'lodash/isEmpty';

import { getNameByLanguage } from '../../utils/multiple-language';

import { Badge } from '../Badges';

import Tag from '../../component/Tag';
import TruncateMarkup from 'react-truncate-markup';
import { QuillText } from '../../component/QuillText';
import Vote from '../../component/Vote';
import { getIdAndToken } from '../../utils/cookie-tools';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: calc(50% - 20px);
    background-color: white;
    padding: 10px 10px;
    margin: 10px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    position: relative;
    display: flex;

    ${media.tabletLandscape`
        width: calc(100% - 20px);
    `}
`;

const InfosWrapper = styled.div`
    margin: 5px 0;
`;

const InfosSup = styled.span`
    margin-left: 10px;
    font-size: 0.9em;

    & span {
        color: #bbbbbb;
    }

    & time {
        margin-right: 10px;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.2em;
    margin-bottom: 10px;
    min-height: 45px;
`;

const UserName = styled.span`
    color: #009fff;
    margin-right: 10px;
    font-size: 1.1em;

    &:hover {
        color: #0570b1;
    }
`;

const DescriptionWrapper = styled.div`
    margin-top: 5px;
    font-size: 1.1em;
    min-height: 50px;
`;

const LeftWrapper = styled.div`
    padding-right: 10px;
    display: flex;
    flex-direction: column;
`;

const RightWrapper = styled.div`
    position: relative;
    padding-bottom: 55px;
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
`;

const BottomWrapper = styled.div`
    position: absolute;
    bottom: 0;
    background-color: #efefefc7;
    width: 100%;
    padding: 15px 10px;
`;

const InfoSpace = styled.span`
    background-color: white;
    margin-right: 10px;
    padding: 5px 10px;
    & i {
        margin-right: 5px;
    }
`;

const Question = ({
    question,
    isVoting,
    isAuthenticated,
    voteQuestion,
    showConfirmToLogin,
    history
}) => {
    const { t } = useTranslation();
    const {
        id,
        askedBy = {},
        body,
        categoryItem,
        bestAnswerItem,
        created,
        answerCount,
        viewCount,
        slug,
        tagList,
        upVoteCount,
        downVoteCount,
        voted
    } = question;

    const { id: currentUserId } = getIdAndToken();

    const tagsRender = (tagList || []).map(tag => (
        <Tag key={tag.id} tag={tag} />
    ));

    const redirect = url => ev => {
        ev.stopPropagation();
        history.push(url);
    };

    const handleVoteQuestion = isPositiveVote => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteQuestion(id, action);
    };

    const toQuestionView = () => redirect(`/homes/question/${slug}/view`);

    console.log(isVoting);

    return (
        <Wrapper>
            <LeftWrapper>
                <UserLogo user={askedBy} />
                <Vote
                    points={upVoteCount - downVoteCount}
                    disableVote={currentUserId === askedBy.id}
                    voted={voted}
                    isLoading={isVoting}
                    handleVote={handleVoteQuestion}
                />
            </LeftWrapper>
            <RightWrapper>
                <TruncateMarkup lines={2}>
                    <Title onClick={toQuestionView}>{question.title}</Title>
                </TruncateMarkup>
                <InfosWrapper>
                    <UserName onClick={redirect(`/users/${askedBy.id}`)}>
                        {`${askedBy.firstName} ${askedBy.lastName}`}
                    </UserName>
                    <Badge points={askedBy.points} />
                    <InfosSup>
                        <span>{`${t('common_asked')}: `}</span>
                        <time dateTime={created}>
                            {` ${new Date(created).toDateString()}`}
                        </time>
                        <span>{`${t('common_in')}: `}</span>
                        {getNameByLanguage(categoryItem)}
                    </InfosSup>
                </InfosWrapper>
                <DescriptionWrapper>
                    <QuillText lines={2} content={body} />
                </DescriptionWrapper>
                {!isEmpty(tagsRender) && (
                    <div className="row">{tagsRender}</div>
                )}
                <BottomWrapper>
                    <InfoSpace>
                        <i className="icon-comment" />
                        <span>{`${answerCount} ${t('common_answer')}`}</span>
                    </InfoSpace>
                    <InfoSpace>
                        <i className="icon-eye" />
                        <span>{`${viewCount} ${t('common_views')}`}</span>
                    </InfoSpace>
                    {!!bestAnswerItem && <div>Answered</div>}
                </BottomWrapper>
            </RightWrapper>
        </Wrapper>
    );
};

export default Question;
