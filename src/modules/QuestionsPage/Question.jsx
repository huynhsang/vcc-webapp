import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import UserLogo from '../../component/UserLogo';
import isEmpty from 'lodash/isEmpty';
import { getNameByLanguage } from '../../utils/multiple-language';
import LikeBox from '../../component/LikeBox';

import Tag from '../../component/Tag';
import TruncateMarkup from 'react-truncate-markup';
import { QuillText } from '../../component/QuillText';
import { getIdAndToken } from '../../utils/cookie-tools';
import DoneAll from '@material-ui/icons/DoneAll';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ModeComment from '@material-ui/icons/ModeComment';

import LabelIcon from '@material-ui/icons/Label';

import { RowWrapper } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: white;
    padding: 20px 20px 0;
    margin: 10px 0 20px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    cursor: pointer;

    &:hover {
        background-color: #f4f4f46b;
    }

    border-left: ${(p) => p.hasLeftBorder && '4px solid #1ea01e'};

    ${media.tabletLandscape`
        margin: 15px 0;
        padding: 10px 10px 0;
        border: none;
    `}
`;

const InfosSup = styled.div`
    font-size: 0.9em;
    line-height: 0.9em;

    & span {
        color: #7f7f7f;
    }

    & time {
        color: #5a5a5a;
    }
    ${media.mobile`
        margin-left: 0;
    `}
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.2em;

    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
`;

const UserName = styled.div`
    color: #053d68;
    margin-right: 10px;
    margin-bottom: 3px;
    font-size: 0.9em;
    display: inline-block;
    line-height: 1rem;

    &:hover {
        transform: scale(1.1) translateZ(0);
    }
`;

const DescriptionWrapper = styled.div`
    margin: 10px 0;
    overflow: hidden;
`;

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cecece;
    color: #585858;
    font-size: 0.9rem;
    padding: 0.6rem 0;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserWrapper = styled(FlexWrapper)`
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    margin: 5px 0 10px;
`;

const InfoSpace = styled(FlexWrapper)`
    color: #7f7f7f;
    margin-left: 10px;

    & svg {
        margin-right: 5px;
        font-size: 15px;
    }

    @media (max-width: 395px) {
        margin-left: 5px;
        display: ${(p) => p.hideInMobile && 'none'};
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
    margin: -10px -10px 0 0;

    & svg {
        margin-right: 5px;
    }

    ${media.tabletLandscape`
        width: 100%;
        margin: 0 0 5px 0;
    `}
`;

const TagsWrapper = styled(RowWrapper)`
    margin-bottom: 5px;
`;

const AskTo = styled.div`
    color: #7f7f7f;
`;

const UserAsked = styled.div`
    padding: 0 5px;
`;

const UserAsk = styled.div`
    display: flex;
    align-items: flex-end;

    ${media.mobileLandscape`
        width:100%;
        justify-content:flex-end;
    `}
`;

const UserInfos = styled.div`
    text-align: right;
    margin-right: 10px;
    ${media.tabletLandscape`
        margin-right: 5px;
    `}
`;

const CategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5px;
    font-size: 0.9rem;
    font-weight: 600;

    & svg {
        margin-right: 5px;
        color: #616161;
    }
`;

const TopWrapper = styled(FlexWrapper)`
    justify-content: space-between;
    margin-bottom: 10px;
    flex-direction: row-reverse;
    flex-wrap: wrap;
`;

const Question = ({
    question,
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

    const tagsRender = (tagList || []).map((tag) => (
        <Tag key={tag.id} tag={tag} />
    ));

    const redirect = (url) => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    const handleVoteQuestion = (isPositiveVote) => {
        if (!isAuthenticated) {
            return showLoginConfirm();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteQuestion(id, action);
    };

    const userAskedList = supporterList.map((val) => (
        <UserAsked key={val.id}>{`${val.lastName} ${val.firstName}`}</UserAsked>
    ));

    return (
        <Wrapper
            hasLeftBorder={!!bestAnswerItem}
            onClick={redirect(`/questions/${slug}`)}
        >
            <TopWrapper>
                {!!bestAnswerItem && (
                    <ResolveLabel>
                        <DoneAll />
                        {t('question_resolved')}
                    </ResolveLabel>
                )}
                <TruncateMarkup lines={2}>
                    <Title>{question.title}</Title>
                </TruncateMarkup>
            </TopWrapper>
            <DescriptionWrapper>
                <QuillText lines={2} content={body} />
            </DescriptionWrapper>
            <CategoryWrapper>
                <LabelIcon />
                {getNameByLanguage(categoryItem)}
            </CategoryWrapper>
            {!isEmpty(tagsRender) && <TagsWrapper>{tagsRender}</TagsWrapper>}
            <UserWrapper>
                <FlexWrapper>
                    {supporterList.length > 0 && (
                        <>
                            <AskTo>{t('common_ask_to')}:</AskTo>
                            {userAskedList}
                        </>
                    )}
                </FlexWrapper>
                <UserAsk>
                    <UserInfos>
                        <UserName onClick={redirect(`/users/${askedBy.id}`)}>
                            {askedBy.username}
                        </UserName>
                        <InfosSup>
                            <span>{`${t('common_asked')}: `}</span>
                            <time dateTime={created}>
                                {` ${new Date(created).toDateString()}`}
                            </time>
                        </InfosSup>
                    </UserInfos>
                    <UserLogo user={askedBy} />
                </UserAsk>
            </UserWrapper>
            <BottomWrapper>
                <LikeBox
                    upVoteCount={upVoteCount}
                    downVoteCount={downVoteCount}
                    voted={voted}
                    handleVote={handleVoteQuestion}
                    disabled={currentUserId === askedBy.id}
                />
                <FlexWrapper>
                    <InfoSpace>
                        <ModeComment />
                        <div>{`${answerCount} ${t('common_answer')}`}</div>
                    </InfoSpace>
                    <InfoSpace hideInMobile>
                        <RemoveRedEye />
                        <div>{`${viewCount} ${t('common_views')}`}</div>
                    </InfoSpace>
                </FlexWrapper>
            </BottomWrapper>
        </Wrapper>
    );
};

export default Question;
