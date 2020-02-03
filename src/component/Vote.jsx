import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import RightArrowIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    button: {
        minWidth: '25px',
        padding: '5px 0',
        color: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        '&:disabled': {
            backgroundColor: '#eee !important'
        }
    },
    buttonVoted: {
        '&:disabled': {
            color: '#2c6bae !important',
            backgroundColor: 'white !important'
        }
    }
}));

const BottomArrowIcon = styled(RightArrowIcon)`
    transform: rotate(90deg);
`;

const TopArrowIcon = styled(RightArrowIcon)`
    transform: rotate(270deg);
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
`;

const CountWrapper = styled.div`
    padding: 10px 0;
    font-size: 1.2em;
    font-weight: 600;
`;

const Vote = ({ points, disableVote, voted, isLoading, handleVote }) => {
    const classes = useStyles();
    return (
        <Wrapper>
            <Button
                className={`${classes.button} ${voted === 'up' &&
                    classes.buttonVoted}`}
                disabled={disableVote || voted === 'up'}
                size="small"
                variant="contained"
                onClick={() => handleVote(true)}
            >
                <TopArrowIcon />
            </Button>
            <CountWrapper>
                {isLoading ? (
                    <CircularProgress size={18} thickness={5} />
                ) : (
                    points
                )}
            </CountWrapper>
            <Button
                className={`${classes.button} ${voted === 'down' &&
                    classes.buttonVoted}`}
                disabled={disableVote || voted === 'down'}
                size="small"
                variant="contained"
                onClick={() => handleVote(false)}
            >
                <BottomArrowIcon />
            </Button>
        </Wrapper>
    );
};

export default Vote;
