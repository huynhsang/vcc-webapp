import React from 'react';
import {Link} from "react-router-dom";
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import logo from '../../../../static/resources/images/logo.png';
import logo2x from '../../../../static/resources/images/logo-2x.png';
// import RootScope from "../../../../global/RootScope";
// import type {User} from "../../../../domain/User";

export default class Header extends BasicComponent {
    render() {
        // const currentUser: User = RootScope.currentUser;
        return (
            <div className="hidden-header header-dark mobile_bar_active">
                <header className="header">
                    <div className="discy-container">
                        <div className="mobile-menu">
                            <div className="mobile-menu-click">
                                <i className="icon-menu"/>
                            </div>
                        </div>
                        <div className="right-header float_r">
                            <Link className="sign-in-lock mob-sign-in" to="/login">
                                <i className="icon-lock"/>
                            </Link>
                            <Link className="button-default button-sign-in" to="/login">Sign In</Link>
                            <Link className="button-default-2 button-sign-up" to="/registration">Sign Up</Link>
                        </div>
                        <div className="left-header float_l">
                            <h2 className="screen-reader-text site_logo">VC&C</h2>
                            <Link className="logo float_l logo-img" to="/home" title="Home">
                                <img title="VC&C" height="45" width="137" className="default_screen" alt="VC&C Logo" src={logo}/>
                                <img title="VC&C" height="45" width="137" className="retina_screen" alt="VC&C Logo" src={logo2x}/>
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
                                <nav className="nav float_l" itemScope=""
                                     itemType="https://schema.org/SiteNavigationElement">
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
                                    <a href="/" className="wpqa-question">
                                        <i className="icon-help-circled"/>Ask a Question
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
