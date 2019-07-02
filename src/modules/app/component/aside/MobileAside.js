import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";

export default class MobileAside extends BasicComponent {
    render() {
        return (
            <aside className="mobile-aside mobile-menu-wrap gray-mobile-menu">
                <h3 className="screen-reader-text">Mobile menu</h3>
                <div className="mobile-aside-inner mCustomScrollbar _mCS_1 mCS_no_scrollbar">
                    <div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                         style={{maxHeight: "none"}} tabIndex="0">
                        <div id="mCSB_1_container" className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                             style={{position: "relative", top:0, left:0}} dir="ltr">
                            <div className="mobile-aside-inner-inner">
                                <a href="/" className="mobile-aside-close">
                                    <i className="icon-cancel"/>
                                    <span className="screen-reader-text">Close</span>
                                </a>
                                <div className="mobile-menu-top mobile--top">
                                    <div className="widget widget_ask">
                                        <a href="/" className="button-default wpqa-question">Ask a Question</a>
                                    </div>
                                </div>
                                <div className="mobile-menu-left">
                                    <ul id="nav_menu" className="menu">
                                        <li id="menu-item-128"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-128">
                                            <a href="/">
                                                <i className="icon-home"/>Home</a></li>
                                        <li id="menu-item-129"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-129">
                                            <a href="/">
                                                <i className="icon-folder"/>Communities</a></li>
                                        <li id="menu-item-130" className="nav_menu_open menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-130">
                                            <a href="/">
                                                <i className="icon-book-open"/>Questions</a>
                                            <ul className="sub-menu">
                                                <li id="menu-item-131"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-131">
                                                    <a href="/">New Questions</a>
                                                </li>
                                                <li id="menu-item-132"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-132">
                                                    <a href="/">Trending Questions</a>
                                                </li>
                                                <li id="menu-item-133"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-133">
                                                    <a href="/">Must read Questions</a>
                                                </li>
                                                <li id="menu-item-134"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-134">
                                                    <a href="/">Hot Questions</a>
                                                </li>
                                            </ul>
                                            <span className="mobile-arrows">
                                                <i className="icon-down-open"/>
                                            </span>
                                        </li>
                                        <li id="menu-item-135" className="wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-135 li-poll">
                                            <a href="/">
                                                <i className="icon-megaphone"/>Polls
                                            </a>
                                        </li>
                                        <li id="menu-item-136" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-136">
                                            <a href="/">
                                                <i className="icon-tag"/>Tags
                                            </a>
                                        </li>
                                        <li id="menu-item-138"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138">
                                            <a href="/badges/"><i
                                                className="icon-trophy"/>Badges</a></li>
                                        <li id="menu-item-137"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                            <a href="/users/"><i
                                                className="icon-users"/>Users</a></li>
                                        <li id="menu-item-139"
                                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139">
                                            <a href="/faqs/"><i
                                                className="icon-lifebuoy"/>Help</a></li>
                                    </ul>
                                </div>
                                <div className="mobile--top">
                                    <ul id="menu-header-1" className="menu">
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-75">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-76">
                                            <a href="/about-us/">About
                                                Us</a></li>
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77">
                                            <a
                                               href="/blog/">Blog</a></li>
                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-78">
                                            <a
                                               href="/contact-us/">Contact
                                                Us</a></li>
                                    </ul>
                                </div>
                                <div className="mobile--top post-search">
                                    <form role="search" method="get" className="searchform main-search-form"
                                          action="/search/">
                                        <div className="row">
                                            <div className="col col10">
                                                <input type="search" className="live-search" autoComplete="off"
                                                       name="search" defaultValue="Hit enter to search" />
                                                    <div className="loader_2 search_loader"></div>
                                                    <div className="search-results results-empty"></div>
                                                    <input type="hidden" name="search_type" className="search_type"
                                                           defaultValue="questions"/>
                                            </div>
                                            <div className="wpqa_form col col2">
                                                <input type="submit" className="button-default" defaultValue="Search"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div id="mCSB_1_scrollbar_vertical" className="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical"
                             style={{display: "none"}}>
                            <div className="mCSB_draggerContainer">
                                <div id="mCSB_1_dragger_vertical" className="mCSB_dragger"
                                     style={{position: "absolute", "minHeight": "30px", top: "0px"}}>
                                    <div className="mCSB_dragger_bar" style={{lineHeight: "30px"}}/>
                                </div>
                                <div className="mCSB_draggerRail"/>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        )
    }
}