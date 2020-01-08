import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CookieHelper from '../../common/util/CookieHelper';
import CookieConstant from '../../common/constant/CookieConstant';

import useOutClick from '../../hooks/useOutClick';

import { getIdAndToken } from '../../utils/cookie-tools';

const DefaultAvatar =
    'https://cdn0.iconfinder.com/data/icons/user-pictures/100/malecostume-512.png';

const { deleteCookie } = CookieHelper;
const { userIdKey } = CookieConstant;

const Authenticate = ({
    App,
    setIsAuthenticated,
    setToLogin,
    setToRegistre,
    history,
    isAuthenticated,
    currentUser
}) => {
    const { t } = useTranslation();
    const [showUserMenu, setShowUserMenu] = React.useState(false);

    const { firstName, lastName } = currentUser || {};
    const fullName = `${firstName} ${lastName}`;

    const { id: userId } = getIdAndToken();

    const outClickMenu = () => {
        if (showUserMenu) {
            setShowUserMenu(false);
        }
    };

    const outClickRef = useOutClick(outClickMenu);

    const logout = () => {
        deleteCookie(CookieConstant.jwtTokenName);
        deleteCookie(userIdKey);
        setIsAuthenticated(false);
        history.push('/homes');
    };

    const userMenuStyle = showUserMenu
        ? { display: 'block' }
        : { display: 'none' };

    if (isAuthenticated) {
        return (
            <div className="right-header float_r">
                <div className="user-login-area">
                    {/* <div className="notifications-area user-notifications float_r">
                            <span className="notifications-click" />
                            <i className="icon-bell" />
                            <div>
                                <ul>
                                    <li>
                                        <i className="icon-bucket" />
                                        <div>
                                            Gift of the site - 20
                                            Points.
                                            <span className="notifications-date">
                                                June 23, 2019 at 4:19 pm
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                                <Link to="/profile/sanght/notifications/">
                                    Show all notifications.
                                </Link>
                            </div>
                        </div> */}
                    <div className="user-login-click float_r user-click-open">
                        <span
                            className="user-click"
                            onClick={() => setShowUserMenu(state => !state)}
                        />
                        <div className="user-image float_l">
                            <img
                                className="avatar avatar-29 photo"
                                alt=""
                                title={fullName}
                                width="29"
                                height="29"
                                src={DefaultAvatar}
                            />
                        </div>
                        <div
                            className="user-login float_l"
                            style={{ marginTop: '22px' }}
                        >
                            <span>Welcome</span>
                            <br />
                            <div className="float_l">{fullName}</div>
                        </div>
                        <i className="icon-down-open-mini" />
                        {!!currentUser && (
                            <ul style={userMenuStyle} ref={outClickRef}>
                                <li>
                                    <Link to={`/users/${userId}/my-profile`}>
                                        <i className="icon-user" />
                                        {t('header_user_profile')}
                                    </Link>
                                </li>
                                <li key="logout">
                                    <a //eslint-disable-line jsx-a11y/anchor-is-valid
                                        onClick={logout}
                                    >
                                        <i className="icon-logout" />{' '}
                                        {t('header_logout')}
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="right-header float_r">
            <a //eslint-disable-line jsx-a11y/anchor-is-valid
                className="sign-in-lock mob-sign-in"
                onClick={setToLogin}
            >
                <i className="icon-lock" />
            </a>
            <a //eslint-disable-line jsx-a11y/anchor-is-valid
                className="button-default button-sign-in"
                onClick={setToLogin}
            >
                {t('common_login')}
            </a>
            <a //eslint-disable-line jsx-a11y/anchor-is-valid
                className="button-default-2 button-sign-up"
                onClick={setToRegistre}
            >
                {t('authentification_sign_up')}
            </a>
        </div>
    );
};

export default withRouter(Authenticate);
