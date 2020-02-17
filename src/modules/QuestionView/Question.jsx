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
import { rowCss } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    background-color: white;
    padding: 20px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    ${media.mobileLandscape`
        padding: 10px;
    `}
`;

const InfosWrapper = styled.div`
    margin-left: 10px;
`;

const InfosSup = styled.div`
    margin-bottom: 10px;
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
    margin-bottom: 15px;
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
    margin: 15px 0;
    font-size: 1.1em;
    min-height: 50px;
    color: #464646;
`;

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoSpace = styled.span`
    & i {
        margin-right: 5px;
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const TagsWrapper = styled.div`
    ${rowCss};
    margin-bottom: 10px;
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
            <Title onClick={toQuestionView}>{question.title}</Title>
            <FlexWrapper>
                <UserLogo user={askedBy} />
                <InfosWrapper>
                    <UserName onClick={redirect(`/users/${askedBy.id}`)}>
                        {`${askedBy.firstName} ${askedBy.lastName}`}
                    </UserName>
                    <br />
                    <Badge points={askedBy.points} />
                </InfosWrapper>
            </FlexWrapper>
            <DescriptionWrapper>{body}</DescriptionWrapper>
            <InfosSup>
                <span>{`${t('common_asked')}: `}</span>
                <time dateTime={created}>
                    {` ${new Date(created).toDateString()}`}
                </time>
                <span>{`${t('common_in')}: `}</span>
                {getNameByLanguage(categoryItem)}
            </InfosSup>
            {!isEmpty(tagsRender) && <TagsWrapper>{tagsRender}</TagsWrapper>}
            <BottomWrapper>
                <FlexWrapper>
                    <div>Vote : </div>
                    <Vote
                        isColumn={false}
                        points={upVoteCount - downVoteCount}
                        disableVote={currentUserId === askedBy.id}
                        voted={voted}
                        isLoading={isVoting}
                        handleVote={handleVoteQuestion}
                        points={upVoteCount - downVoteCount}
                    />
                </FlexWrapper>
                <InfoSpace>
                    <i className="icon-eye" />
                    <span>{`${viewCount} ${t('common_views')}`}</span>
                </InfoSpace>
            </BottomWrapper>
        </Wrapper>
    );
};

export default Question;
