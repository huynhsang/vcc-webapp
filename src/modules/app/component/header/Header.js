import React from 'react';
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
                <header className="header" itemScope="" itemType="https://schema.org/WPHeader">
                    <div className="discy-container">
                        <div className="mobile-menu">
                            <div className="mobile-menu-click"><i className="icon-menu"/></div>
                        </div>
                        <div className="right-header float_r"><a className="sign-in-lock mob-sign-in"
                                                                 href="https://2code.info/demo/themes/Discy/Main/login/"
                                                                 data-toggle="modal"><i className="icon-lock"/></a><a
                            className="button-default button-sign-in"
                            href="https://2code.info/demo/themes/Discy/Main/login/" data-toggle="modal">Sign In</a><a
                            className="button-default-2 button-sign-up"
                            href="https://2code.info/demo/themes/Discy/Main/signup/">Sign Up</a></div>
                        <div className="left-header float_l">
                            <h2 className="screen-reader-text site_logo">Discy</h2>
                            <a className="logo float_l logo-img" href="https://2code.info/demo/themes/Discy/Main/"
                               title="Discy"> <img title="Discy" height="45" width="137" className="default_screen"
                                                   alt="Discy Logo"
                                                   src={logo}/> <img
                                title="Discy" height="45" width="137" className="retina_screen" alt="Discy Logo"
                                src={logo2x}/> </a>
                            <div className="mid-header float_l">
                                <div className="header-search float_r">
                                    <form role="search" className="searchform main-search-form" method="get"
                                          action="https://2code.info/demo/themes/Discy/Main/search/">
                                        <div className="search-wrapper">
                                            <input type="search" className="live-search live-search-icon"
                                                   autoComplete="off" placeholder="Type Search Words" name="search"
                                                   value=""/>
                                                <div className="loader_2 search_loader"/>
                                                <div className="search-results results-empty"/>
                                                <input type="hidden" name="search_type" className="search_type"
                                                       value="questions"/>
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
                                            <a className="" href="https://2code.info/demo/themes/Discy/Main/">Home</a>
                                        </li>
                                        <li id="menu-item-76"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-76">
                                            <a className="" href="https://2code.info/demo/themes/Discy/Main/about-us/">About
                                                Us</a></li>
                                        <li id="menu-item-77"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77">
                                            <a className=""
                                               href="https://2code.info/demo/themes/Discy/Main/blog/">Blog</a></li>
                                        <li id="menu-item-78"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-78">
                                            <a className=""
                                               href="https://2code.info/demo/themes/Discy/Main/contact-us/">Contact
                                                Us</a></li>
                                        <li id="menu-item-166"
                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-166">
                                            <a className="" href="https://1.envato.market/drV57">Buy Theme</a></li>
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
                                <div className="mobile-bar-search"><a
                                    href="https://2code.info/demo/themes/Discy/Main/search/"><i
                                    className="icon-search"/>Search</a>
                                    <form role="search" method="get" className="searchform main-search-form"
                                          action="https://2code.info/demo/themes/Discy/Main/search/"><i
                                        className="icon-left-open"/>
                                        <input type="search" className="live-search" autoComplete="off" name="search"
                                               value="Hit enter to search"
                                               onFocus="if(this.value==&#39;Hit enter to search&#39;)this.value=&#39;&#39;;"
                                               onBlur="if(this.value==&#39;&#39;)this.value=&#39;Hit enter to search&#39;;"/>
                                            <div className="loader_2 search_loader"/>
                                            <div className="search-results results-empty"/>
                                            <input type="hidden" name="search_type" className="search_type"
                                                   value="questions"/>
                                    </form>
                                </div>
                                <div className="mobile-bar-ask"><a
                                    href="https://2code.info/demo/themes/Discy/Main/add-question/"
                                    className="wpqa-question"><i className="icon-help-circled"/>Ask a Question</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

		)
	}
}
