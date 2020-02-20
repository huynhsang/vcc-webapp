import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { Badge } from '../Badges';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getIdAndToken } from '../../utils/cookie-tools';
import Vote from '../../component/Vote';
import Button from '@material-ui/core/Button';
import DoneOutline from '@material-ui/icons/DoneOutline';
import { createMediaTemplate } from '../../utils/css-tools';

const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    desktopButton: {
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    mobileButton: {
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'block'
        }
    }
}));

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    flex-direction: row-reverse;
    ${media.mobileLandscape`
        flex-direction: column;
    `}
`;

const UserInfos = styled(FlexWrapper)`
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

const SpaceBetween = styled(FlexWrapper)`
    justify-content: space-between;
    ${media.mobileLandscape`
        width: 100%;
    `}
`;

const DoneOutlineIcon = styled(DoneOutline)`
    color: green;
    font-size: 40px !important;
    display: ${p => (p.isdesktop ? 'block' : 'none')} !important;
    ${media.mobileLandscape`
        display: ${p => (p.isdesktop ? 'none' : 'block')} !important;
    `}
`;

const Answer = ({
    answer,
    isVoting,
    isAuthenticated,
    showConfirmToLogin,
    voteAnswer,
    approveAnswer,
    isBestAnswer
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
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

    const renderButton = classname =>
        !approveAnswer ? null : (
            <Button
                className={classname}
                variant="outlined"
                onClick={approveAnswer}
                size="small"
            >
                Approve
            </Button>
        );

    return (
        <Wrapper>
            <RightWrapper>
                <ContentWrapper>
                    <ReactMarkdown source={body} />
                </ContentWrapper>
                <SpaceBetween>
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
                    {renderButton(classes.desktopButton)}
                    {isBestAnswer && <DoneOutlineIcon isdesktop={1} />}
                </SpaceBetween>
            </RightWrapper>
            <SpaceBetween>
                <Vote
                    isResponsive
                    points={upVoteCount - downVoteCount}
                    disableVote={currentUserId === userAnwserId}
                    voted={voted}
                    isLoading={isVoting}
                    handleVote={handleVoteAnswer}
                />
                {renderButton(classes.mobileButton)}
                {isBestAnswer && <DoneOutlineIcon />}
            </SpaceBetween>
        </Wrapper>
    );
};

export default Answer;
