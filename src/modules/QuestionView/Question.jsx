import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import UserLogo from '../../component/UserLogo';
import isEmpty from 'lodash/isEmpty';
import { getNameByLanguage } from '../../utils/multiple-language';
import { Badge } from '../../component/Badge';
import Tag from '../../component/Tag';
import Vote from '../../component/Vote';
import { getIdAndToken } from '../../utils/cookie-tools';
import SocialNetwork from '../../component/SocialNetwork';
import ReactMarkdown from 'react-markdown';

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
    padding: 20px 20px 10px;
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
        color: #7f7f7f;
    }

    & time {
        margin-right: 10px;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
`;

const UserName = styled.span`
    color: #009fff;
    font-size: 1.1em;

    &:hover {
        color: #0570b1;
    }
`;

const DescriptionWrapper = styled.div`
    line-height: 18px;
    margin: 15px 0;
    color: #464646;
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

const FlexSpaceBetween = styled(FlexWrapper)`
    justify-content: space-between;
`;

const TopWrapper = styled(FlexSpaceBetween)`
    margin-bottom: 15px;
`;

const ResolveLabel = styled.div`
    background-color: #1ea01e;
    color: white;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    margin-left: 5px;
    border-radius: 3px;

    & svg {
        margin-right: 5px;
    }
`;

const TagsWrapper = styled.div`
    margin-bottom: 10px;
`;

const SocialWrapper = styled.div`
    border-top: 1px solid #eaeaea;
    padding-top: 10px;
    margin-top: 10px;
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
            return showLoginConfirm();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteQuestion(id, action);
    };

    const { REACT_APP_DOMAIN_NAME } = process.env;
    const url = `${REACT_APP_DOMAIN_NAME}/questions/${slug}`;

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
            <InfosSup>
                <span>{`${t('common_asked')}: `}</span>
                <time dateTime={created}>
                    {` ${new Date(created).toDateString()}`}
                </time>
                <span>{`${t('common_in')}: `}</span>
                {getNameByLanguage(categoryItem)}
            </InfosSup>
            {!isEmpty(tagsRender) && <TagsWrapper>{tagsRender}</TagsWrapper>}
            <FlexSpaceBetween>
                <FlexWrapper>
                    <div>Vote : </div>
                    <Vote
                        isColumn={false}
                        points={upVoteCount - downVoteCount}
                        disableVote={currentUserId === askedBy.id}
                        voted={voted}
                        isLoading={isVoting}
                        handleVote={handleVoteQuestion}
                    />
                </FlexWrapper>
                <InfoSpace>
                    <i className="icon-eye" />
                    <span>{`${viewCount} ${t('common_views')}`}</span>
                </InfoSpace>
            </FlexSpaceBetween>
            <SocialWrapper>
                <SocialNetwork
                    fbLink={`${FACEBOOK_SHARE_URL}${url}`}
                    twitterLink={`${TWITTER_SHARE_URL}${url}`}
                    linkedInLink={`${LINKEDIN_SHARE_URL}${url}`}
                />
            </SocialWrapper>
        </Wrapper>
    );
};

export default Question;
