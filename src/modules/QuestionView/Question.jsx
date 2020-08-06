import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import UserLogo from '../../component/UserLogo';
import isEmpty from 'lodash/isEmpty';
import { getNameByLanguage } from '../../utils/multiple-language';
import Tag from '../../component/Tag';
import LikeBox from '../../component/LikeBox';
import { getIdAndToken } from '../../utils/cookie-tools';
import SocialNetwork from '../../component/SocialNetwork';
import ReactMarkdown from 'react-markdown';
import { getUserName } from '../../utils/get-user-name';

import {
    FACEBOOK_SHARE_URL,
    TWITTER_SHARE_URL,
    LINKEDIN_SHARE_URL
} from '../../constants/share.constant';
import DoneAll from '@material-ui/icons/DoneAll';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    background-color: white;
    padding: 15px 20px 10px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    ${media.mobileLandscape`
        padding: 10px;
    `}
`;

const InfosSup = styled.div`
    margin-bottom: 5px;
    font-size: 0.9em;
    & span {
        color: #7f7f7f;
    }

    & time {
        margin-right: 10px;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
    overflow: hidden;
    margin-right: 5px;
`;

const UserName = styled.div`
    color: #053d68;
    font-size: 0.9rem;
    line-height: 1rem;
    margin-right: 10px;

    &:hover {
        transform: scale(1.1) translateZ(0);
    }
`;

const DescriptionWrapper = styled.div`
    line-height: 18px;
    margin: 10px 0;
    color: #464646;
    overflow: hidden;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: ${(p) => p.alignItems || 'center'};
    justify-content: ${(p) => p.justifyContent};
    flex-wrap: wrap;
`;

const TopWrapper = styled(FlexWrapper)`
    margin-bottom: 15px;
    justify-content: space-between;
`;

const ResolveLabel = styled.div`
    background-color: #1ea01e;
    color: white;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    border-radius: 3px;

    & svg {
        margin-right: 5px;
    }
`;

const TagsWrapper = styled.div``;

const BottomWrapper = styled.div`
    border-top: 1px solid #eaeaea;
    padding-top: 10px;
    margin-top: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
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
        slug,
        tagList,
        upVoteCount,
        downVoteCount,
        voted
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

    const { REACT_APP_DOMAIN_NAME } = process.env;
    const url = `${REACT_APP_DOMAIN_NAME}/topics/${slug}`;

    return (
        <Wrapper>
            <TopWrapper>
                <Title>{question.title}</Title>
                {!!bestAnswerItem && (
                    <ResolveLabel>
                        <DoneAll />
                        {t('question_resolved')}
                    </ResolveLabel>
                )}
            </TopWrapper>
            <DescriptionWrapper>
                <ReactMarkdown source={body} />
            </DescriptionWrapper>
            {!isEmpty(tagsRender) && <TagsWrapper>{tagsRender}</TagsWrapper>}
            <FlexWrapper alignItems="flex-end" justifyContent="space-between">
                <InfosSup>
                    <span>{`${t('common_asked')}: `}</span>
                    <time dateTime={created}>
                        {` ${new Date(created).toDateString()}`}
                    </time>
                    <span>{`${t('common_in')}: `}</span>
                    {getNameByLanguage(categoryItem)}
                </InfosSup>
                <FlexWrapper alignItems="flex-end">
                    <UserName onClick={redirect(`/users/${askedBy.id}`)}>
                        {getUserName(askedBy)}
                    </UserName>
                    <UserLogo user={askedBy} />
                </FlexWrapper>
            </FlexWrapper>
            <BottomWrapper>
                <LikeBox
                    upVoteCount={upVoteCount}
                    downVoteCount={downVoteCount}
                    voted={voted}
                    handleVote={handleVoteQuestion}
                    disabled={currentUserId === askedBy.id}
                />
                <SocialNetwork
                    fbLink={`${FACEBOOK_SHARE_URL}${url}`}
                    twitterLink={`${TWITTER_SHARE_URL}${url}`}
                    linkedInLink={`${LINKEDIN_SHARE_URL}${url}`}
                />
            </BottomWrapper>
        </Wrapper>
    );
};

export default Question;
