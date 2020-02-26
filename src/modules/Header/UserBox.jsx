import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import CookieHelper from '../../common/util/CookieHelper';
import CookieConstant from '../../common/constant/CookieConstant';

import { getIdAndToken } from '../../utils/cookie-tools';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const DefaultAvatar =
    'https://cdn0.iconfinder.com/data/icons/user-pictures/100/malecostume-512.png';

const { deleteCookie } = CookieHelper;
const { userIdKey } = CookieConstant;

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
    font-size: 10px;
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

    const [showUserMenu, setShowUserMenu] = React.useState(false);

    const { firstName, lastName } = currentUser || {};
    const fullName = `${firstName} ${lastName}`;

    const { id: userId } = getIdAndToken();

    const logout = () => {
        deleteCookie(CookieConstant.jwtTokenName);
        deleteCookie(userIdKey);
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
                        src={DefaultAvatar}
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
        <div>
            <Button variant="contained" onClick={setToLogin} color="primary">
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
        </div>
    );
};

export default withRouter(Authenticate);

{
    /* <a //eslint-disable-line jsx-a11y/anchor-is-valid
className="sign-in-lock mob-sign-in"
onClick={setToLogin}
>
<i className="icon-lock" />
</a> */
}
