import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';

import isEmpty from 'lodash/isEmpty';

import { getNameByLanguage } from '../../utils/multiple-language';

import { Badge } from '../../component/Badge';

import Tag from '../../component/Tag';
import TruncateMarkup from 'react-truncate-markup';
import { QuillText } from '../../component/QuillText';
import Vote from '../../component/Vote';
import { getIdAndToken } from '../../utils/cookie-tools';
import DoneAll from '@material-ui/icons/DoneAll';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ModeComment from '@material-ui/icons/ModeComment';

import { RowWrapper } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: calc(50% - 20px);
    background-color: white;
    padding: 10px 10px;
    margin: 10px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    position: relative;
    display: flex;

    cursor: pointer;

    &:hover {
        transform: translateY(-10px);
    }

    ${media.tabletLandscape`
        width: calc(100% - 20px);
    `}
`;

const InfosWrapper = styled.div`
    margin: 5px 0;
`;

const InfosSup = styled.div`
    display: inline-block;
    margin-left: 10px;
    font-size: 0.9em;

    & span {
        color: #7f7f7f;
    }

    & time {
        margin-right: 10px;
    }
    ${media.mobile`
        margin-left: 0;
    `}
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
    margin: 10px 0;
    min-height: 50px;
    overflow: hidden;
`;

const LeftWrapper = styled.div`
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    ${media.mobileLandscape`
        padding-right: 5px;
    `}
`;

const RightWrapper = styled.div`
    position: relative;
    padding-bottom: 55px;
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    ${media.mobileLandscape`
        padding-bottom: 80px;
    `}

    max-width: calc(100% - 50px);

    @media (max-width: 1080px)  and (min-width: 1025px) {
        padding-bottom: 80px;
    }
`;

const BottomWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    background-color: #efefefc7;
    width: 100%;
    padding: 15px 10px;
    color: #585858;

    @media (max-width: 1080px) and (min-width: 1025px) {
        flex-direction: column;
    }

    ${media.mobileLandscape`
        flex-direction: column;
        padding: 10px 5px;
    `}
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const InfoSpace = styled(FlexWrapper)`
    background-color: white;
    margin-right: 10px;
    padding: 5px 10px;

    & svg {
        margin-right: 5px;
        font-size: 15px;
    }
`;

const ResolveLabel = styled.div`
    background-color: #1ea01e;
    color: white;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    white-space: nowrap;
    border-radius: 3px;

    & svg {
        margin-right: 5px;
    }

    @media (max-width: 1080px) and (min-width: 1025px) {
        margin-top: 10px;
    }

    ${media.mobileLandscape`
        margin-top: 10px;
    `}
`;

const TagsWrapper = styled(RowWrapper)`
    margin-bottom: 5px;
`;

const AsktToWrapper = styled(FlexWrapper)`
    margin-bottom: 15px;
`;
const AskTo = styled.div`
    color: #7f7f7f;
`;

const UserAsked = styled.div`
    padding: 0 5px;
`;

const Question = ({
    question,
    isVoting,
    isAuthenticated,
    voteQuestion,
    showLoginConfirm,
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
        voted,
        supporterList
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
            return showLoginConfirm();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteQuestion(id, action);
    };

    const userAskedList = supporterList.map(val => (
        <UserAsked key={val.id}>{`${val.lastName} ${val.firstName}`}</UserAsked>
    ));

    return (
        <Wrapper onClick={redirect(`/questions/${slug}`)}>
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
                    <Title>{question.title}</Title>
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
                    <TagsWrapper>{tagsRender}</TagsWrapper>
                )}
                {supporterList.length > 0 && (
                    <AsktToWrapper>
                        <AskTo>{t('common_ask_to')}:</AskTo>
                        {userAskedList}
                    </AsktToWrapper>
                )}
                <BottomWrapper>
                    <FlexWrapper>
                        <InfoSpace>
                            <ModeComment />
                            <div>{`${answerCount} ${t('common_answer')}`}</div>
                        </InfoSpace>
                        <InfoSpace>
                            <RemoveRedEye />
                            <div>{`${viewCount} ${t('common_views')}`}</div>
                        </InfoSpace>
                    </FlexWrapper>
                    {!!bestAnswerItem && (
                        <ResolveLabel>
                            <DoneAll />
                            {t('question_resolved')}
                        </ResolveLabel>
                    )}
                </BottomWrapper>
            </RightWrapper>
        </Wrapper>
    );
};

export default Question;
