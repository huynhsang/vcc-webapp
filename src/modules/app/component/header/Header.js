import React from 'react';
import {Link} from "react-router-dom";
import ApplicationUtil from '../../../../common/util/ApplicationUtil';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import logo from '../../../../static/resources/img/logo/logo.png';
import logo2x from '../../../../static/resources/img/logo/logo-2x.png';
import PropTypes from "prop-types";
import RootScope from "../../../../global/RootScope";
import type {User} from "../../../../domain/User";

const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    doLogOut: PropTypes.func.isRequired,
};
export default class Header extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = {
            showUserMenu: false
        }
    }

    toggleUserMenu() {
        this.changeStateValue("showUserMenu", !this.state.showUserMenu);
    };

    logout = () => {
       this.props.doLogOut();
       window.location = "/login";
    };

    render() {
        const currentUser: User = RootScope.currentUser;
        const fullName: string = currentUser ?
            ApplicationUtil.formatString('{0} {1}', [currentUser.firstName, currentUser.lastName]) : '';
        const userMenuStyle = this.state.showUserMenu ? {display: 'block'} : {display: 'none'};
        return (
            <div className="hidden-header header-dark mobile_bar_active">
                <header className="header">
                    <div className="discy-container">
                        <div className="mobile-menu">
                            <div className="mobile-menu-click">
                                <i className="icon-menu"/>
                            </div>
                        </div>
                        {
                            this.props.isAuthenticated ?
                                <div className="right-header float_r">
                                    <div className="user-login-area">
                                        <div className="notifications-area user-notifications float_r">
                                            <span className="notifications-click"/>
                                            <i className="icon-bell"/>
                                            <div>
                                                <ul>
                                                    <li>
                                                        <i className="icon-bucket"/>
                                                        <div>
                                                            Gift of the site - 20 Points.
                                                            <span className="notifications-date">June 23, 2019 at 4:19 pm</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <a href="/profile/sanght/notifications/">
                                                    Show all notifications.
                                                </a>
                                            </div>
                                        </div>
                                        <div className="user-login-click float_r user-click-open">
                                            <span className="user-click" onClick={() => this.toggleUserMenu()}/>
                                            <div className="user-image float_l">
                                                <img className="avatar avatar-29 photo" alt={{fullName}} title={{fullName}} width="29" height="29" src="https://secure.gravatar.com/avatar/eda01b9e40edbfd790a5a8cc69e0791e?s=96&d=mm&r=g"/>
                                            </div>
                                            <div className="user-login float_l" style={{marginTop: "22px"}}>
                                                <span>Welcome</span>
                                                <br/>
                                                <div className="float_l">{fullName}</div>
                                            </div>
                                            <i className="icon-down-open-mini"/>
                                            <ul style={userMenuStyle}>
                                                <li>
                                                    <Link to="/user-profile">
                                                    <i className="icon-user"/>User Profile</Link>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        <i className="icon-cog"/>Edit Profile
                                                    </a>
                                                </li>
                                                <li><a
                                                    href="/profile/sanght/best-answers/"><i
                                                    className="icon-graduation-cap"/>Best Answers</a></li>
                                                <li>
                                                    <a onClick={this.logout}>
                                                        <i className="icon-logout"/> Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> :
                                <div className="right-header float_r">
                                    <Link className="sign-in-lock mob-sign-in" to="/login">
                                        <i className="icon-lock"/>
                                    </Link>
                                    <Link className="button-default button-sign-in" to="/login">Sign In</Link>
                                    <Link className="button-default-2 button-sign-up" to="/registration">Sign Up</Link>
                                </div>
                        }
                        <div className="left-header float_l">
                            <h2 className="screen-reader-text site_logo">VC&C</h2>
                            <Link className="logo float_l logo-img" to="/" title="Home">
                                <img title="VC&C" width="60" className="default_screen" alt="VC&C Logo" src={logo}/>
                                <img title="VC&C" width="60" className="retina_screen" alt="VC&C Logo" src={logo2x}/>
                            </Link>
                            <div className="mid-header float_l">
                                <div className="header-search float_r">
                                    <form role="search" className="searchform main-search-form" method="get" action="#">
                                        <div className="search-wrapper">
                                            <input type="search" className="live-search live-search-icon"
                                                   autoComplete="off" placeholder="Type Search Words" name="search"/>
                                            <div className="loader_2 search_loader"/>
                                            <div className="search-results results-empty"/>
                                            <input type="hidden" name="search_type" className="search_type"/>
                                            <div className="search-click"/>
                                            <button type="submit"><i className="icon-search"/></button>
                                        </div>
                                    </form>
                                </div>
                                <nav className="nav float_l">
                                    <h3 className="screen-reader-text">Discy Navigation</h3>
                                    <ul id="menu-header" className="menu">
                                        <li id="menu-item-75"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-75">
                                            <Link className="" to="/home">Home</Link>
                                        </li>
                                        <li id="menu-item-76"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-76">
                                            <Link className="" to="/home">About Us</Link>
                                        </li>
                                        <li id="menu-item-77"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77">
                                            <Link className="" to="/">Blog</Link>
                                        </li>
                                        <li id="menu-item-78"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-78">
                                            <Link className="" to="/contact-us">Contact
                                                Us</Link>
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
                                    <a href="/">
                                        <i className="icon-search"/>Search
                                    </a>
                                    <form role="search" method="get" className="searchform main-search-form" action="/">
                                        <i className="icon-left-open"/>
                                        <input type="search" className="live-search" autoComplete="off" name="search"/>
                                        <div className="loader_2 search_loader"/>
                                        <div className="search-results results-empty"/>
                                        <input type="hidden" name="search_type" className="search_type"
                                               value="questions"/>
                                    </form>
                                </div>
                                <div className="mobile-bar-ask">
                                    <Link to="/question/add" className="wpqa-question">
                                        <i className="icon-help-circled"/>Ask a Question
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
Header.propTypes = propTypes;
