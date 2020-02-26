import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { headerTabs } from './header.constant';

import Button from '@material-ui/core/Button';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    button: {
        color: 'white',
        '&:hover': {
            backgroundColor: '#1a1c21'
        },
        margin: '0px 5px'
    },
    activeButton: {
        backgroundColor: '#1a1c21',
        fontWeight: 600
    }
}));

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;

    ${media.mobileLandscape`
        display:none;
    `}
`;

const MainMenu = ({ location, history }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const { pathname } = location;

    const paths = pathname.match(/\/[\w-]+/g);
    const tabSelected = paths && paths[0] ? paths[0].substring(1) : '';

    const redirect = url => () => {
        history.push(url);
    };

    return (
        <Wrapper>
            {headerTabs.map(val => (
                <Button
                    className={`${classes.button} ${val.path === tabSelected &&
                        classes.activeButton} `}
                    key={val.label}
                    onClick={redirect(`/${val.path}`)}
                >
                    {t(val.label)}
                </Button>
            ))}
            <Button
                className={classes.button}
                onClick={() => {
                    window.location = 'https://vcncblog.site/';
                }}
            >
                {t('header_blog')}
            </Button>
        </Wrapper>
    );
};

export default MainMenu;
