import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { Badge } from '../../component/Badge';
import { useTranslation } from 'react-i18next';
import { getIdAndToken } from '../../utils/cookie-tools';
import Button from '@material-ui/core/Button';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { createMediaTemplate } from '../../utils/css-tools';
import LikeBox from '../../component/LikeBox';
import UserLogo from '../../component/UserLogo';

const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    approveButton: {
        marginRight: '5px',
        fontSize: '0.8rem',
        padding: '2px 5px',
        backgroundColor: '#13a918',
        color: 'white',
        '&:hover': {
            backgroundColor: '#0e8a12'
        }
    }
}));

const FlexWrapper = styled.div`
    display: flex;
    align-items: ${(p) => p.alginItems || 'center'};
    justify-content: ${(p) => p.justifyContent};
`;

const Wrapper = styled.div`
    margin-top: 10px;
    border-top: 1px solid #eaeaea;
`;

const DateWrapper = styled.div`
    color: #00000069;
    font-size: 0.9rem;
    ${media.mobileLandscape`
      margin: 5px 0 0;
    `}
`;

const UserName = styled.div`
    font-size: 0.9rem;
    line-height: 1rem;
`;

const CheckCircleIcon = styled(CheckCircle)`
    color: #1ea01e;
    font-size: 1.6rem !important;
    margin-right: 5px;
`;

const BottomWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    margin-top: 5px;
`;

const InfosWrapper = styled.div`
    margin-left: 10px;
`;

const Answer = ({
    answer,
    isAuthenticated,
    showLoginConfirm,
    voteAnswer,
    approveAnswer,
    isBestAnswer,
    history
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

    const handleVoteAnswer = (isPositiveVote) => {
        if (!isAuthenticated) {
            return showLoginConfirm();
        }
        const action = isPositiveVote ? 'up' : 'down';
        voteAnswer(answer.id, action);
    };

    const redirect = (url) => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    return (
        <Wrapper>
            <ReactMarkdown source={body} />
            <FlexWrapper alginItems="flex-end" justifyContent="space-between">
                <DateWrapper>
                    {t('answer_added_an_answer_on')}{' '}
                    {new Date(created).toDateString()}
                </DateWrapper>
                <FlexWrapper>
                    <UserLogo user={answerBy} />
                    <InfosWrapper>
                        <UserName onClick={redirect(`/users/${userAnwserId}`)}>
                            {`${firstName} ${lastName}`}
                        </UserName>
                        <Badge points={points} />
                    </InfosWrapper>
                </FlexWrapper>
            </FlexWrapper>
            <BottomWrapper>
                {isBestAnswer && <CheckCircleIcon />}
                {!!approveAnswer && (
                    <Button
                        variant="contained"
                        onClick={approveAnswer}
                        className={classes.approveButton}
                    >
                        Approve
                    </Button>
                )}
                <LikeBox
                    upVoteCount={upVoteCount}
                    downVoteCount={downVoteCount}
                    voted={voted}
                    handleVote={handleVoteAnswer}
                    disabled={currentUserId === userAnwserId}
                />
            </BottomWrapper>
        </Wrapper>
    );
};

export default Answer;
