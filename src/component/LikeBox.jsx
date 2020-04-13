import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import UnlikeIcon from '@material-ui/icons/ThumbDownOutlined';
import ActiveLikeIcon from '@material-ui/icons/ThumbUp';
import ActiveUnlikeIcon from '@material-ui/icons/ThumbDown';

const Flex = styled.div`
    display: flex;
`;

const button = {
    fontSize: '0.9rem',
    padding: '2px 5px',
    textTransform: 'none',
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

const LikeBox = ({
    upVoteCount = 0,
    downVoteCount = 0,
    handleVote,
    voted,
    disabled
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const isActiveUp = voted === 'up';
    const isActiveDown = voted === 'down';

    const toVote = (value) => (ev) => {
        ev.stopPropagation();
        if((isActiveUp && value) || (isActiveDown && !value)){
            return;
        }
        handleVote(value);
    };

    const LiveIconImpl = isActiveUp ? ActiveLikeIcon : LikeIcon;
    const UnliveIconImpl = isActiveDown ? ActiveUnlikeIcon : UnlikeIcon;

    return (
        <Flex>
            <Button
                color={isActiveUp ? 'primary' : 'default'}
                startIcon={<LiveIconImpl className={classes.icon} />}
                className={classes.leftButton}
                disabled={disabled}
                onClick={toVote(true)}
            >
                {`${upVoteCount} ${t('common_like')}`}
            </Button>
            <Button
                color={isActiveDown ? 'secondary' : 'default'}
                startIcon={<UnliveIconImpl className={classes.icon} />}
                className={classes.rightButton}
                disabled={disabled}
                onClick={toVote(false)}
            >
                {`${downVoteCount} ${t('common_unlike')}`}
            </Button>
        </Flex>
    );
};

export default LikeBox;
