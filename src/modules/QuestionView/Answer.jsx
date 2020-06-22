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

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { ConfirmModal } from '../ConfirmModal';

import { ROLES } from '../../constants/constants';

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
    },
    deleteButton: {
        margin: '0 0 0 5px',
        padding: '2px'
    }
}));

const FlexWrapper = styled.div`
    display: flex;
    align-items: ${(p) => p.alginItems || 'center'};
    justify-content: ${(p) => p.justifyContent};
`;

const Wrapper = styled.div`
    margin-top: 5px;
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
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

const InfosWrapper = styled.div`
    margin-left: 5px;
`;

const AnswerWrapper = styled.div`
    overflow: hidden;
`;

const Answer = ({
    answer,
    isAuthenticated,
    showLoginConfirm,
    voteAnswer,
    approveAnswer,
    isBestAnswer,
    history,
    removeAnswer
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
    const { id: currentUserId, role: userRole } = getIdAndToken();

    const {
        voted,
        upVoteCount,
        downVoteCount,
        answerBy,
        body,
        created
    } = answer;
    const { id: userAnwserId, firstName, lastName, points } = answerBy;

    const deleteAnswerFn = () => {
        setIsOpenDeleteModal(true);
    };

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

    const isAnswerOwner = userAnwserId === currentUserId;
    const isAdmin = ROLES.ADMIN === userRole;

    return (
        <>
            <Wrapper>
                <AnswerWrapper>
                    <ReactMarkdown source={body} />
                </AnswerWrapper>
                <FlexWrapper
                    alginItems="flex-end"
                    justifyContent="space-between"
                >
                    <DateWrapper>
                        {t('answer_added_an_answer_on')}{' '}
                        {new Date(created).toDateString()}
                    </DateWrapper>
                    <FlexWrapper>
                        <UserLogo user={answerBy} />
                        <InfosWrapper>
                            <UserName
                                onClick={redirect(`/users/${userAnwserId}`)}
                            >
                                {`${firstName} ${lastName}`}
                            </UserName>
                            <Badge points={points} />
                        </InfosWrapper>
                    </FlexWrapper>
                </FlexWrapper>
                <BottomWrapper>
                    <FlexWrapper justifyContent="space-between">
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
                    </FlexWrapper>
                    {isAdmin ||
                        (isAnswerOwner && (
                            <IconButton
                                color="secondary"
                                className={classes.deleteButton}
                                onClick={deleteAnswerFn}
                            >
                                <DeleteIcon />
                            </IconButton>
                        ))}
                </BottomWrapper>
            </Wrapper>
            <ConfirmModal
                isOpen={isOpenDeleteModal}
                action={() => removeAnswer(answer.id)}
                title={t('question_do_you_want_to_delete_this_answer')}
                cancel={() => setIsOpenDeleteModal(false)}
            />
        </>
    );
};

export default Answer;
