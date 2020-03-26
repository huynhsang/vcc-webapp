import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { deleteCookie } from '../../utils/CookieHelper';
import { USER_ID_KEY, JWT_TOKEN_NAME } from '../../constants/cookie.constant';

import { getIdAndToken } from '../../utils/cookie-tools';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';

import DefaultAvatar from '../../images/default-user-logo.png';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    button: {
        marginLeft: '10px'
    },
    nameButton: {
        textTransform: 'none',
        '& .MuiButton-label': {
            color: 'white',
            display: 'flex',
            alignItems: 'center'
        }
    },
    loginIconButton: {
        color: 'white',
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'block'
        }
    },
    loginButton: {
        color: 'white'
    }
}));

const Wrapper = styled.div``;

const AvatarImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Welcome = styled.div`
    font-size: 0.8rem;
`;

const ResponsiveHide = styled.div`
    display: flex;
    align-items: center;
    ${media.mobileLandscape`
        display:none;
    `}
`;

const Authenticate = ({
    setIsAuthenticated,
    setToLogin,
    setToRegistre,
    history,
    isAuthenticated,
    currentUser
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { firstName, lastName, avatar } = currentUser || {};
    const fullName = `${firstName} ${lastName}`;

    const { id: userId } = getIdAndToken();

    const logout = () => {
        deleteCookie(JWT_TOKEN_NAME);
        deleteCookie(USER_ID_KEY);
        setIsAuthenticated(false);
        history.push('/home');
        handleClose();
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toMyProile = () => {
        history.push(`/users/${userId}/my-profile`);
        handleClose();
    };

    if (isAuthenticated) {
        return (
            <Wrapper>
                <Button className={classes.nameButton} onClick={handleClick}>
                    <AvatarImg
                        alt={fullName}
                        title={fullName}
                        src={avatar || DefaultAvatar}
                    />
                    <ResponsiveHide>
                        <div>
                            <Welcome>Welcome</Welcome>
                            <div>{fullName}</div>
                        </div>
                        <ArrowDropDown />
                    </ResponsiveHide>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={toMyProile}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('header_user_profile')} />
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('header_logout')} />
                    </MenuItem>
                </Menu>
            </Wrapper>
        );
    }

    return (
        <>
            <ResponsiveHide>
                <Button className={classes.loginButton} onClick={setToLogin}>
                    {t('common_login')}
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={setToRegistre}
                    color="primary"
                >
                    {t('authentification_sign_up')}
                </Button>
            </ResponsiveHide>
            <IconButton
                className={classes.loginIconButton}
                onClick={setToLogin}
            >
                <Lock />
            </IconButton>
        </>
    );
};

export default withRouter(Authenticate);
