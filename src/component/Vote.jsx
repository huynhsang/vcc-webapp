import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import RightArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

import { createMediaTemplate } from '../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    button: {
        minWidth: '0px',
        padding: '2px',
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
    flex-direction: ${p => p.isColumn && 'column'};
    justify-content: space-between;
    align-items: center;
    padding: ${p => (p.isColumn ? '15px 0' : '0 15px')};

    ${p=> p.isResponsive && media.mobileLandscape`
        flex-direction: row;
        justify-content: flex-start;
        padding: 5px 0;
    `}
`;

const CountWrapper = styled.div`
    padding: 10px;
    font-size: 1.2em;
    font-weight: 600;
`;

const Vote = ({
    points,
    disableVote,
    voted,
    isLoading,
    handleVote,
    isColumn = true,
    isResponsive= false
}) => {
    const classes = useStyles();
    return (
        <Wrapper isColumn={isColumn} isResponsive={isResponsive}>
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
