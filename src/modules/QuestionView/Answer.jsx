import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Badge } from '../Badges';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getIdAndToken } from '../../utils/cookie-tools';
import Vote from '../../component/Vote';
import { createMediaTemplate } from '../../utils/css-tools';

const media = createMediaTemplate();

const FlexWrapper = styled.div`
    display: flex;
`;

const Wrapper = styled(FlexWrapper)`
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    flex-direction: row-reverse;
    ${media.mobileLandscape`
        flex-direction: column;
    `}
`;

const UserInfos = styled.div`
    display: flex;
    font-size: 0.9em;
    ${media.mobileLandscape`
        flex-direction: column;
        align-items: flex-start;
    `}
`;

const ContentWrapper = styled.div`
    color: #464646;
`;

const DateWrapper = styled.div`
    margin-left: 10px;
    ${media.mobileLandscape`
      margin: 5px 0 0;
    `}
`;

const UserName = styled.div`
    margin-right: 10px;
`;

const RightWrapper = styled.div`
    margin-left: 10px;
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    ${media.mobileLandscape`
      margin-left: 0px;
      flex-basis: auto;
    `}
`;

const Answer = ({
    answer,
    isVoting,
    isAuthenticated,
    showConfirmToLogin,
    voteAnswer
}) => {
    const { t } = useTranslation();
    const { id: currentUserId } = getIdAndToken();

    const {
        voted,
        upVoteCount,
        downVoteCount,
        answerBy,
        body,
        created
    } = answer;
    const { id: userAnwserId, firstName, lastName, points } = answerBy;

    const handleVoteAnswer = isPositiveVote => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteAnswer(answer.id, action);
    };

    return (
        <Wrapper>
            <RightWrapper>
                <ContentWrapper>
                    <ReactMarkdown source={body} />
                </ContentWrapper>
                <UserInfos>
                    <Link to={`/users/${userAnwserId}`}>
                        <UserName>{`${firstName} ${lastName}`}</UserName>
                    </Link>
                    <Badge points={points} />
                    <DateWrapper>
                        {t('answer_added_an_answer_on')}{' '}
                        {new Date(created).toDateString()}
                    </DateWrapper>
                </UserInfos>
            </RightWrapper>
            <Vote
                isResponsive
                points={upVoteCount - downVoteCount}
                disableVote={currentUserId === userAnwserId}
                voted={voted}
                isLoading={isVoting}
                handleVote={handleVoteAnswer}
                points={upVoteCount - downVoteCount}
            />
        </Wrapper>
    );
};

export default Answer;
