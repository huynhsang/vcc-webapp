import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import LikeIcon from '@material-ui/icons/ThumbUp';
import UnlikeIcon from '@material-ui/icons/ThumbDown';

const Flex = styled.div`
    display: flex;
`;

const button = {
    fontSize: '0.8rem',
    padding: '2px 5px',
};

const useStyles = makeStyles(() => ({
    leftButton: {
        marginRight: '5px',
        '& .MuiButton-startIcon': {
            margin: '-1px 5px 0 0'
        },
        ...button
    },
    rightButton: {
        '& .MuiButton-startIcon': {
            margin: '3px 5px 0 0'
        },
        ...button
    },
    icon: {
        fontSize: '1rem !important'
    }
}));

const LikeBox = ({ upVoteCount = 0, downVoteCount = 0, handleVote, voted, disabled }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const toVote = (value) => (ev) => {
        ev.stopPropagation();
        handleVote(value);
    };

    return (
        <Flex>
            <Button
                variant="contained"
                color="primary"
                startIcon={<LikeIcon className={classes.icon} />}
                className={classes.leftButton}
                disabled={disabled || voted === 'up'}
                onClick={toVote(true)}
            >
                {`${upVoteCount} ${t('common_like')}`}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<UnlikeIcon className={classes.icon} />}
                className={classes.rightButton}
                disabled={disabled || voted === 'down'}
                onClick={toVote(false)}
            >
                {`${downVoteCount} ${t('common_unlike')}`}
            </Button>
        </Flex>
    );
};

export default LikeBox;
