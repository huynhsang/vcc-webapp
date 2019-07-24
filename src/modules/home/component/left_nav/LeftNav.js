import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import {Link} from "react-router-dom";

export default class LeftNav extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowQuestionTabs: false,
        };
    }
    handleToggleQuestion = () => {
        this.changeStateValue('isShowQuestionTabs', !this.state.isShowQuestionTabs);
    };

    render() {
        const params = new URLSearchParams(window.location.search);
        const currentShow: string = params.get('show');
        const isShowQuestionTabs: boolean = this.state.isShowQuestionTabs;
        const subMenuDefaultClassName: string = "menu-item menu-item-type-custom menu-item-object-custom";
        return (
            <nav className="nav_menu float_r fixed_nav_menu sider-left">
                <div className="theiaStickySidebar"
                     style={{paddingTop: "0px", paddingBottom: "1px", position: "static", top: "30px", left: "135px"}}>
                    <h3 className="screen-reader-text">Explore</h3>
                    <ul id="menu-explore-not-login" className="menu">
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item current_page_item">
                            <a href="/">
                                <i className="icon-home"/>Home
                            </a>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href="/">
                                <i className="icon-folder"/>Communities
                            </a>
                        </li>
                        <li className="nav_menu_open menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                            <a onClick={this.handleToggleQuestion}><i className="icon-book-open"/>Questions</a>
                            {
                                isShowQuestionTabs ?
                                    <ul className="sub-menu">
                                        <li className={currentShow === "recent-questions" ? `${subMenuDefaultClassName} current-menu-item` : subMenuDefaultClassName}>
                                            <Link to="/?show=recent-questions" onClick={()=>this.changeStateValue()}>
                                                New Questions
                                            </Link>
                                        </li>
                                        <li className={currentShow === "most-voted" ? `${subMenuDefaultClassName} current-menu-item` : subMenuDefaultClassName}>
                                            <Link to="/?show=most-voted" onClick={()=>this.changeStateValue()}>
                                                Trending Questions
                                            </Link>
                                        </li>
                                        <li className={currentShow === "most-visited" ? `${subMenuDefaultClassName} current-menu-item` : subMenuDefaultClassName}>
                                            <Link to="/?show=most-visited" onClick={()=>this.changeStateValue()}>
                                                Must read Questions
                                            </Link>
                                        </li>
                                        <li className={currentShow === "most-answered" ? `${subMenuDefaultClassName} current-menu-item` : subMenuDefaultClassName}>
                                            <Link to="/?show=most-answered" onClick={()=>this.changeStateValue()}>
                                                Hot Questions
                                            </Link>
                                        </li>
                                    </ul> : ''
                            }
                        </li>
                        {/*<li className="wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom li-poll">*/}
                            {/*<Link to="/questions/?type=poll">*/}
                                {/*<i className="icon-megaphone"/>Polls*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        <li className="menu-item menu-item-type-post_type menu-item-object-page">
                            <Link to="/tags">
                                <i className="icon-tag"/>Tags
                            </Link>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page">
                            <Link to="/badges">
                                <i className="icon-trophy"/>Badges
                            </Link>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page">
                            <Link to="/">
                                <i className="icon-users"/>Users
                            </Link>
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page">
                            <Link to="/">
                                <i className="icon-lifebuoy"/>Help
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
