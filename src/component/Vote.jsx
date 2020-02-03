import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import RightArrowIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        minWidth: '25px',
        padding: '5px 0',
        color: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
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
    padding: 8px 0;
    font-size: 1.2em;
    font-weight: 600;
`;

const Vote = ({
    points,
    disableUp,
    disableDown,
    isLoading,
    handleVote,
    isMobile,
    isAnswerVote
}) => {
    const classes = useStyles();
    return (
        <Wrapper>
            <Button className={classes.button} size="small" variant="contained">
                <TopArrowIcon />
            </Button>
            <CountWrapper>{points}</CountWrapper>
            <Button className={classes.button} size="small" variant="contained">
                <BottomArrowIcon />
            </Button>
        </Wrapper>
    );
};

export default Vote;
