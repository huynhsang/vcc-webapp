import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../static/resources/img/logo/logo.png';
import logo2x from '../../static/resources/img/logo/logo-2x.png';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import CookieHelper from '../../common/util/CookieHelper';
import CookieConstant from '../../common/constant/CookieConstant';
import { LanguageSelector } from '../LanguageSelector';

import useOutClick from '../../hooks/useOutClick';
import { headerTabs } from './header.constant';

import {
    setIsAuthenticatedFn,
    setToLoginFn,
    setToRegistreFn,
    toggleMobileAsideFn,
    toggleContactUsFn
} from '../../actions/app';

const DefaultAvatar = 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/malecostume-512.png';

const { getCookie, deleteCookie } = CookieHelper;
const { userIdKey } = CookieConstant;

const Header = ({
    App,
    setIsAuthenticated,
    location,
    setToLogin,
    setToRegistre,
    history,
    toggleMobileAside,
    toggleContactUs
}) => {
    const { t } = useTranslation();
    const { isAuthenticated, currentUser } = App;

    const { pathname } = location;

    const paths = pathname.match(/\/[\w-]+/g);
    const tabSelected = paths && paths[0] ? paths[0].substring(1) : '';

    const [showUserMenu, setShowUserMenu] = React.useState(false);

    const logout = () => {
        deleteCookie(CookieConstant.jwtTokenName);
        deleteCookie(CookieConstant.userIdKey);
        setIsAuthenticated(false);
        history.push('/home');
    };

    const { firstName, lastName } = currentUser || {};

    const fullName = `${firstName} ${lastName}`;

    const userMenuStyle = showUserMenu
        ? { display: 'block' }
        : { display: 'none' };

    const MainMenu = (
        <ul id="menu-header" className="menu">
            {headerTabs.map(val => (
                <li
                    className={
                        val.path === tabSelected ? 'current-menu-item' : ''
                    }
                    key={val.label}
                >
                    <Link to={`/${val.path}`}>{t(`${val.label}`)}</Link>
                </li>
            ))}
            <li key={'contact-us'}>
                <a //eslint-disable-line jsx-a11y/anchor-is-valid
                    onClick={() => toggleContactUs(true)}
                >
                    {t('header_contact_us')}
                </a>
            </li>
            <li key={'blog'}>
                <a href="https://lqdalumni.site/">{t('header_blog')}</a>
            </li>
        </ul>
    );

    const outClickMenu = () => {
        if (showUserMenu) {
            setShowUserMenu(false);
        }
    };

    const outClickRef = useOutClick(outClickMenu);

    const UserMenu = !!currentUser && (
        <ul style={userMenuStyle} ref={outClickRef}>
            <li>
                <Link to={`/users/${getCookie(userIdKey)}/general`}>
                    <i className="icon-user" />
                    {t('header_user_profile')}
                </Link>
            </li>
            <li key="logout">
                <a //eslint-disable-line jsx-a11y/anchor-is-valid
                    onClick={logout}
                >
                    <i className="icon-logout" /> {t('header_logout')}
                </a>
            </li>
        </ul>
    );

    return (
        <div className="hidden-header header-dark mobile_bar_active">
            <header className="header">
                <div className="discy-container">
                    <div className="mobile-menu">
                        <div
                            className="mobile-menu-click"
                            onClick={() => toggleMobileAside(true)}
                        >
                            <i className="icon-menu" />
                        </div>
                    </div>
                    {isAuthenticated ? (
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
                                        onClick={() =>
                                            setShowUserMenu(state => !state)
                                        }
                                    />
                                    <div className="user-image float_l">
                                        <img
                                            className="avatar avatar-29 photo"
                                            alt=''
                                            title={ fullName }
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
                                        <div className="float_l">
                                            {fullName}
                                        </div>
                                    </div>
                                    <i className="icon-down-open-mini" />
                                    {UserMenu}
                                </div>
                            </div>
                        </div>
                    ) : (
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
                    )}
                    <div className="left-header float_l">
                        <h2 className="screen-reader-text site_logo">VC&C</h2>
                        <Link
                            className="logo float_l logo-img"
                            to="/"
                            title="Home"
                        >
                            <img
                                title="VC&C"
                                width="60"
                                className="default_screen"
                                alt="VC&C Logo"
                                src={logo}
                            />
                            <img
                                title="VC&C"
                                width="60"
                                className="retina_screen"
                                alt="VC&C Logo"
                                src={logo2x}
                            />
                        </Link>
                        <div className="mid-header float_l">
                            <div className="header-language-selector">
                                <LanguageSelector />
                            </div>
                            <div className="header-search float_r">
                                <form
                                    role="search"
                                    className="searchform main-search-form"
                                    method="get"
                                    action="#"
                                >
                                    <div className="search-wrapper">
                                        <input
                                            type="search"
                                            className="live-search live-search-icon"
                                            autoComplete="off"
                                            placeholder="Type Search Words"
                                            name="search"
                                        />
                                        <div className="loader_2 search_loader" />
                                        <div className="search-results results-empty" />
                                        <input
                                            type="hidden"
                                            name="search_type"
                                            className="search_type"
                                        />
                                        <div className="search-click" />
                                        <button type="submit">
                                            <i className="icon-search" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <nav className="nav float_l main-menu">
                                <h3 className="screen-reader-text">
                                    VC&C Navigation
                                </h3>
                                {MainMenu}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

// Retrieve data from store as props
const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProps = dispatch => ({
    setIsAuthenticated: val => dispatch(setIsAuthenticatedFn(val)),
    setToLogin: () => dispatch(setToLoginFn()),
    setToRegistre: () => dispatch(setToRegistreFn()),
    toggleMobileAside: val => dispatch(toggleMobileAsideFn(val)),
    toggleContactUs: val => dispatch(toggleContactUsFn(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header));
