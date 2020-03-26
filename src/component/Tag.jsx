import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import { getNameByLanguage } from '../utils/multiple-language';

import Button from '@material-ui/core/Button';

export const tagStyle = {
    button: {
        margin: '0 15px 10px 0',
        padding: '2px',
        color: 'rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgb(241, 241, 241)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        textTransform: 'none',
        '&:disabled': {
            color: 'rgba(0, 0, 0, 0.8) !important'
        },
        '&:hover':{
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }
    },
    activeButton: {
        color: 'white',
        backgroundColor: '#404040',
        '&:disabled': {
            color: 'white !important',
            backgroundColor: '#404040 !important'
        },
        '&:hover': {
            backgroundColor: '#2b2b2b',
        }
    }
};

const useStyles = makeStyles(() => tagStyle);

const Tag = ({ tag, history, location, isClickable = false }) => {
    const classes = useStyles();

    const { pathname, search } = location;
    const { show, text, tags } = qs.parse(search.substr(1));

    const ids = tags ? tags.split(',') : [];

    const onClick = () => {
        const params = { page: 1 };
        if (/questions/.test(pathname)) {
            Object.assign(params, { show, text });
            const index = ids.findIndex(id => id === tag.id);
            if (index !== -1) {
                ids.splice(index, 1);
            } else {
                ids.push(tag.id);
            }
        }
        params.tags = ids.join(',');
        const url = `/questions?${qs.stringify(params)}`;
        history.push(url);
    };

    const isActive = ids.includes(tag.id);

    return (
        <Button
            onClick={onClick}
            size="small"
            variant="contained"
            className={`${classes.button} ${isActive && classes.activeButton}`}
            disabled={!isClickable}
        >
            {getNameByLanguage(tag)}
        </Button>
    );
};

export default withRouter(Tag);
