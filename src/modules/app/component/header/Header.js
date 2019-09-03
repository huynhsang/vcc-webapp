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

import { LanguageSelector } from '../../../LanguageSelector';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  doLogOut: PropTypes.func.isRequired,
};

const LanguageSelectorWapper = styled.div`
  float: right;
  margin: 3px 0px 0px 15px;
`;

const Header = ({ doLogOut, isAuthenticated }) => {
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
                  <ul style={userMenuStyle}>
                    <li>
                      <Link to="/user-profile">
                        <i className="icon-user" />
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="icon-cog" />
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile/best-answers/">
                        <i className="icon-graduation-cap" />
                        Best Answers
                      </Link>
                    </li>
                    <li>
                      <a onClick={logout}>
                        <i className="icon-logout" /> Logout
                      </a>
                    </li>
                  </ul>
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
                <ul id="menu-header" className="menu">
                  <li
                    id="menu-item-75"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-75"
                  >
                    <Link className="" to="/">
                      Home
                    </Link>
                  </li>
                  <li
                    id="menu-item-76"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-76"
                  >
                    <Link className="" to="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li
                    id="menu-item-77"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77"
                  >
                    <a className="" href="https://lqdalumni.site/">
                      Blog
                    </a>
                  </li>
                  <li
                    id="menu-item-78"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-78"
                  >
                    <Link className="" to="/contact-us">
                      Contact Us
                    </Link>
                  </li>
                </ul>
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
                  Ask a Question
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

export default Header;
