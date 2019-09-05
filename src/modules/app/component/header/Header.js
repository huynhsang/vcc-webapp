import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ApplicationUtil from '../../../../common/util/ApplicationUtil';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import logo from '../../../../static/resources/img/logo/logo.png';
import logo2x from '../../../../static/resources/img/logo/logo-2x.png';
import PropTypes from 'prop-types';
import RootScope from '../../../../global/RootScope';
import { User } from '../../../../domain/User';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { LanguageSelector } from '../../../LanguageSelector';

import { headerTabs, userMenuTabs } from './headerConstant';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  doLogOut: PropTypes.func.isRequired,
};

const LanguageSelectorWapper = styled.div`
  float: right;
  margin: 3px 0px 0px 15px;
`;

const Header = ({ doLogOut, isAuthenticated, history }) => {
  const { t } = useTranslation();

  const {
    location: { pathname },
  } = history;

  const paths = pathname.match(/\/[\w-]+/g);
  const tabSelected = paths && paths[0] ? paths[0].substring(1) : '';

  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  const logout = () => {
    doLogOut();
    window.location = '/login';
  };

  const currentUser: User = RootScope.currentUser || {};
  const fullName: string = ApplicationUtil.formatString('{0} {1}', [
    currentUser.firstName,
    currentUser.lastName,
  ]);

  const userMenuStyle = showUserMenu
    ? { display: 'block' }
    : { display: 'none' };
  const searchInput = showSearch ? { display: 'block' } : { display: 'none' };
  const buttonSearch = showSearch ? { display: 'none' } : { display: 'block' };

  const PrincipalMenu = (
    <ul id="menu-header" className="menu">
      {headerTabs.map(val => (
        <li
          className={tabSelected === val.path ? 'current-menu-item' : ''}
          key={val.label}
        >
          <Link to={`/${val.path}`}>{t(`${val.label}`)}</Link>
        </li>
      ))}
      <li key={''}>
        <a href="https://lqdalumni.site/">{t('header_blog')}</a>
      </li>
    </ul>
  );

  const UserMenu = (
    <ul style={userMenuStyle}>
      {userMenuTabs.map(val => (
        <li key={val.path}>
          <Link to={`/${val.path}`}>
            <i className={val.iconClassName} />
            {t(val.label)}
          </Link>
        </li>
      ))}
      <li key="logout">
        <a onClick={logout}>
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
            <div className="mobile-menu-click">
              <i className="icon-menu" />
            </div>
          </div>
          {isAuthenticated ? (
            <div className="right-header float_r">
              <div className="user-login-area">
                <div className="notifications-area user-notifications float_r">
                  <span className="notifications-click" />
                  <i className="icon-bell" />
                  {/* <div>
                    <ul>
                      <li>
                        <i className="icon-bucket" />
                        <div>
                          Gift of the site - 20 Points.
                          <span className="notifications-date">
                            June 23, 2019 at 4:19 pm
                          </span>
                        </div>
                      </li>
                    </ul>
                    <Link to="/profile/sanght/notifications/">
                      Show all notifications.
                    </Link>
                  </div> */}
                </div>
                <div className="user-login-click float_r user-click-open">
                  <span
                    className="user-click"
                    onClick={() => setShowUserMenu(state => !state)}
                  />
                  <div className="user-image float_l">
                    <img
                      className="avatar avatar-29 photo"
                      alt={{ fullName }}
                      title={{ fullName }}
                      width="29"
                      height="29"
                      src={currentUser.avatar}
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
                  {UserMenu}
                </div>
              </div>
            </div>
          ) : (
            <div className="right-header float_r">
              <Link className="sign-in-lock mob-sign-in" to="/login">
                <i className="icon-lock" />
              </Link>
              <Link className="button-default button-sign-in" to="/login">
                Sign In
              </Link>
              <Link
                className="button-default-2 button-sign-up"
                to="/registration"
              >
                Sign Up
              </Link>
            </div>
          )}
          <div className="left-header float_l">
            <h2 className="screen-reader-text site_logo">VC&C</h2>
            <Link className="logo float_l logo-img" to="/" title="Home">
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
              <LanguageSelectorWapper>
                <LanguageSelector />
              </LanguageSelectorWapper>
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
              <nav className="nav float_l">
                <h3 className="screen-reader-text">VC&C Navigation</h3>
                {PrincipalMenu}
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="mobile-bar">
        <div className="discy-container">
          <div className="mobile-bar-content">
            <div className="discy-container">
              <div className="mobile-bar-search">
                <Link
                  style={buttonSearch}
                  to="/"
                  onClick={() => setShowSearch(state => !state)}
                >
                  <i className="icon-search" />
                  Search
                </Link>
                <form
                  style={searchInput}
                  role="search"
                  method="get"
                  className="searchform main-search-form"
                  action="/"
                >
                  <i
                    className="icon-left-open"
                    onClick={() => setShowSearch(state => !state)}
                  />
                  <input
                    type="search"
                    className="live-search"
                    autoComplete="off"
                    name="search"
                    placeholder="Hit enter to search"
                  />
                  <div className="loader_2 search_loader" />
                  <div className="search-results results-empty" />
                  <input
                    type="hidden"
                    name="search_type"
                    className="search_type"
                    value="questions"
                  />
                </form>
              </div>
              <div className="mobile-bar-ask">
                <Link to="/question/add" className="wpqa-question">
                  <i className="icon-help-circled" />
                  {t('home_ask_a_question')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;

export default withRouter(Header);
