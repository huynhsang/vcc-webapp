import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import {Link} from "react-router-dom";

export default class LeftNav extends BasicComponent {
    render() {
        return (
            <nav className="nav_menu float_r fixed_nav_menu"
                 style={{position: "relative", overflow: "visible", boxSizing: "border-box", minHeight: "1px"}}>
                <div className="theiaStickySidebar"
                     style={{paddingTop: "0px", paddingBottom: "1px", position: "static", top: "30px", left: "135px"}}>
                    <h3 className="screen-reader-text">Explore</h3>
                    <ul id="menu-explore-not-login" className="menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-128">
                            <a href="/">
                                <i className="icon-home"/>Home
                            </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-129">
                            <a href="/">
                                <i className="icon-folder"/>Communities
                            </a>
                        </li>
                        <li className="nav_menu_open menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-130">
                            <a href="https://2code.info/demo/themes/Discy/Main/questions/"><i
                                className="icon-book-open"/>Questions</a>
                            <ul className="sub-menu">
                                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-131"><a
                                    className=""
                                    href="https://2code.info/demo/themes/Discy/Main/?show=recent-questions">New
                                    Questions</a></li>
                                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-132"><a
                                    href="https://2code.info/demo/themes/Discy/Main/?show=most-voted">Trending
                                    Questions</a></li>
                                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-133"><a
                                    href="https://2code.info/demo/themes/Discy/Main/?show=most-visited">Must
                                    read Questions</a></li>
                                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-134"><a
                                    href="https://2code.info/demo/themes/Discy/Main/?show=most-answered">Hot
                                    Questions</a></li>
                            </ul>
                        </li>
                        <li className="wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-135 li-poll">
                            <a href="https://2code.info/demo/themes/Discy/Main/questions/?type=poll"><i
                                className="icon-megaphone"/>Polls</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-136">
                            <Link to="/tags">
                                <i className="icon-tag"/>Tags
                            </Link>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138"><a
                            href="https://2code.info/demo/themes/Discy/Main/badges/"><i
                            className="icon-trophy"/>Badges</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"><a
                            href="https://2code.info/demo/themes/Discy/Main/users/"><i
                            className="icon-users"/>Users</a></li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"><a
                            href="https://2code.info/demo/themes/Discy/Main/faqs/"><i
                            className="icon-lifebuoy"/>Help</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
