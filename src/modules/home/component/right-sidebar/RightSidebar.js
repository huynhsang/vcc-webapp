import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";

export default class RightSidebar extends BasicComponent{
    render() {
        return (
            <aside className="sidebar sidebar-width float_l fixed-sidebar"
                   style={{position: "relative", overflow: "visible", boxSizing: "border-box", minHeight: "1px"}}>
                <div className="theiaStickySidebar"
                     style={{paddingTop: "0px", paddingBottom: "1px", position: "static", top: "0px", left: "1026px"}}>
                    <h3 className="screen-reader-text">Sidebar</h3>
                    <div className="inner-sidebar">
                        <div className="widget widget_ask">
                            <a target="_self" href="/" className="button-default wpqa-question">
                                Ask A Question
                            </a>
                        </div>
                        <section id="stats-widget-2" className="widget-no-divider widget stats-widget">
                            <h3 className="screen-reader-text">Stats</h3>
                            <div className="widget-wrap">
                                <ul className="stats-inner">
                                    <li className="stats-questions">
                                        <div><span className="stats-text">Questions</span><span
                                            className="stats-value">21</span></div>
                                    </li>
                                    <li className="stats-answers">
                                        <div><span className="stats-text">Answers</span><span
                                            className="stats-value">69</span></div>
                                    </li>
                                    <li className="stats-best_answers">
                                        <div><span className="stats-text">Best Answers</span><span
                                            className="stats-value">10</span></div>
                                    </li>
                                    <li className="stats-users">
                                        <div><span className="stats-text">Users</span><span
                                            className="stats-value">118</span></div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <div className="widget tabs-wrap widget-tabs">
                            <div className="widget-title widget-title-tabs">
                                <ul className="tabs tabstabs-widget-2">
                                    <li className="tab current"><a href="https://2code.info/demo/themes/Discy/Main/#"
                                                                   className="">Popular</a></li>
                                    <li className="tab"><a
                                        href="https://2code.info/demo/themes/Discy/Main/#">Answers</a></li>
                                </ul>
                                <div className="clearfix"></div>
                            </div>
                            <div className="widget-wrap">
                                <div className="widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab"
                                     style={{display: "block"}}>
                                    <div className="user-notifications user-profile-area">
                                        <div>
                                            <ul>
                                                <li className="widget-posts-text widget-no-img">
                                                    <span className="span-icon">
                                                        <a href="/">
                                                            <img className="avatar avatar-20 photo" alt="Marko Smith" title="Marko Smith" width="20" height="20" src="./Discy – Social Questions and Answers_files/team-4-20x20.jpg"/>
                                                        </a>
                                                    </span>
                                                    <div>
                                                        <h3><a
                                                            href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/"
                                                            title="How to approach applying for a job at a company owned by a friend?"
                                                            rel="bookmark">How to approach applying for a job at a
                                                            company </a></h3>
                                                        <ul className="widget-post-meta">
                                                            <li><a className="post-meta-comment"
                                                                   href="https://2code.info/demo/themes/Discy/Main/question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/#comments"><i
                                                                className="icon-comment"/>7 Answers</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="widget-posts-text widget-no-img"><span
                                                    className="span-icon"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/james/"><img
                                                    className="avatar avatar-20 photo" alt="James Wane"
                                                    title="James Wane" width="20" height="20"
                                                    src="./Discy – Social Questions and Answers_files/team-6-20x20.jpg"/></a></span>
                                                    <div>
                                                        <h3><a
                                                            href="https://2code.info/demo/themes/Discy/Main/question/how-to-handle-personal-stress-caused-by-utterly-incompetent-and-lazy-co-workers/"
                                                            title="How to handle personal stress caused by utterly incompetent and lazy co-workers?"
                                                            rel="bookmark">How to handle personal stress caused by
                                                            utterly incompetent and </a></h3>
                                                        <ul className="widget-post-meta">
                                                            <li><a className="post-meta-comment"
                                                                   href="https://2code.info/demo/themes/Discy/Main/question/how-to-handle-personal-stress-caused-by-utterly-incompetent-and-lazy-co-workers/#comments"><i
                                                                className="icon-comment"/>5 Answers</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="widget-posts-text widget-no-img"><span
                                                    className="span-icon"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/marko/"><img
                                                    className="avatar avatar-20 photo" alt="Marko Smith"
                                                    title="Marko Smith" width="20" height="20"
                                                    src="./Discy – Social Questions and Answers_files/team-4-20x20.jpg"/></a></span>
                                                    <div>
                                                        <h3><a
                                                            href="https://2code.info/demo/themes/Discy/Main/question/what-is-a-programmers-life-like/"
                                                            title="What is a programmer’s life like?" rel="bookmark">What
                                                            is a programmer’s life like?</a></h3>
                                                        <ul className="widget-post-meta">
                                                            <li><a className="post-meta-comment"
                                                                   href="https://2code.info/demo/themes/Discy/Main/question/what-is-a-programmers-life-like/#comments"><i
                                                                className="icon-comment"/>5 Answers</a></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-inner-wrap tab-inner-wraptabs-widget-2" style={{display: "none"}}>
                                    <div className="user-notifications user-profile-area">
                                        <div>
                                            <ul>
                                                <li><span className="span-icon"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/martin/"><img
                                                    className="avatar avatar-25 photo" alt="Martin Hope"
                                                    title="Martin Hope" width="25" height="25"
                                                    src="./Discy – Social Questions and Answers_files/team-2-25x25.jpg"/></a></span>
                                                    <div><a
                                                        href="https://2code.info/demo/themes/Discy/Main/profile/martin/">Martin
                                                        Hope</a> added an answer <span className="question-title"><a
                                                        href="https://2code.info/demo/themes/Discy/Main/question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/#comment-72">They might be as confused as t</a></span><span
                                                        className="notifications-date">April 19, 2018 at 2:07 am</span>
                                                    </div>
                                                </li>
                                                <li><span className="span-icon"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/marko/"><img
                                                    className="avatar avatar-25 photo" alt="Marko Smith"
                                                    title="Marko Smith" width="25" height="25"
                                                    src="./Discy – Social Questions and Answers_files/team-4-25x25.jpg"/></a></span>
                                                    <div><a
                                                        href="https://2code.info/demo/themes/Discy/Main/profile/marko/">Marko
                                                        Smith</a> added an answer <span className="question-title"><a
                                                        href="https://2code.info/demo/themes/Discy/Main/question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/#comment-71">I have never heard a British p</a></span><span
                                                        className="notifications-date">April 19, 2018 at 2:07 am</span>
                                                    </div>
                                                </li>
                                                <li><span className="span-icon"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/john/"><img
                                                    className="avatar avatar-25 photo" alt="John Peter"
                                                    title="John Peter" width="25" height="25"
                                                    src="./Discy – Social Questions and Answers_files/team-9-25x25.jpg"/></a></span>
                                                    <div><a
                                                        href="https://2code.info/demo/themes/Discy/Main/profile/john/">John
                                                        Peter</a> added an answer <span className="question-title"><a
                                                        href="https://2code.info/demo/themes/Discy/Main/question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/#comment-69">Most British people understand</a></span><span
                                                        className="notifications-date">April 19, 2018 at 2:07 am</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section id="users-widget-2" className="widget users-widget">
                            <h2 className="widget-title"><i className="icon-folder"/>Top Members</h2>
                            <div className="widget-wrap">
                                <div className="user-section user-section-small row user-not-normal">
                                    <div className="col col12">
                                        <div className="post-section user-area user-area-small">
                                            <div className="post-inner">
                                                <div className="author-image author-image-42"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/marko/"><span
                                                    className="author-image-span"><img
                                                    className="avatar avatar-42 photo" alt="" title="" width="42"
                                                    height="42"
                                                    src="./Discy – Social Questions and Answers_files/team-4-42x42.jpg"/></span></a>
                                                </div>
                                                <div className="user-content">
                                                    <div className="user-inner">
                                                        <h4><a
                                                            href="https://2code.info/demo/themes/Discy/Main/profile/marko/">Marko
                                                            Smith</a></h4>
                                                        <div className="user-data">
                                                            <ul>
                                                                <li className="user-questions"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/marko/questions/">3
                                                                    Questions</a></li>
                                                                <li className="user-points"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/marko/points/">283
                                                                    Points</a></li>
                                                            </ul>
                                                        </div>
                                                        <span className="badge-span"
                                                              style={{backgroundColor: "#d9a34a"}}>Enlightened</span></div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col12">
                                        <div className="post-section user-area user-area-small">
                                            <div className="post-inner">
                                                <div className="author-image author-image-42"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/aaron/"><span
                                                    className="author-image-span"><img
                                                    className="avatar avatar-42 photo" alt="" title="" width="42"
                                                    height="42"
                                                    src="./Discy – Social Questions and Answers_files/team-1-42x42.jpg"/></span></a>
                                                </div>
                                                <div className="user-content">
                                                    <div className="user-inner">
                                                        <h4><a
                                                            href="https://2code.info/demo/themes/Discy/Main/profile/aaron/">Aaron
                                                            Aiken</a></h4>
                                                        <div className="user-data">
                                                            <ul>
                                                                <li className="user-questions"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/aaron/questions/">3
                                                                    Questions</a></li>
                                                                <li className="user-points"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/aaron/points/">243
                                                                    Points</a></li>
                                                            </ul>
                                                        </div>
                                                        <span className="badge-span"
                                                              style={{backgroundColor: "#6b3de4"}}>Professional</span>
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col12">
                                        <div className="post-section user-area user-area-small">
                                            <div className="post-inner">
                                                <div className="author-image author-image-42"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/"><span
                                                    className="author-image-span"><img
                                                    className="avatar avatar-42 photo" alt="" title="" width="42"
                                                    height="42"
                                                    src="./Discy – Social Questions and Answers_files/team-7-42x42.jpg"/></span></a>
                                                </div>
                                                <div className="user-content">
                                                    <div className="user-inner">
                                                        <h4><a
                                                            href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/">Ahmed
                                                            Hassan</a><span className="verified_user tooltip-n"
                                                                            original-title="Verified"><i
                                                            className="icon-check"/></span></h4>
                                                        <div className="user-data">
                                                            <ul>
                                                                <li className="user-questions"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/questions/">3
                                                                    Questions</a></li>
                                                                <li className="user-points"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/points/">225
                                                                    Points</a></li>
                                                            </ul>
                                                        </div>
                                                        <span className="badge-span"
                                                              style={{backgroundColor: "#6b3de4"}}>Professional</span>
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="tag_cloud-2" className="widget widget_tag_cloud">
                            <h2 className="widget-title"><i className="icon-folder"/>Trending Tags</h2>
                            <div className="tagcloud"><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/analytics/"
                                className="tag-cloud-link tag-link-11 tag-link-position-1" style={{fontSize: "22pt"}}
                                aria-label="analytics (3 items)">analytics</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/british/"
                                className="tag-cloud-link tag-link-37 tag-link-position-2" style={{fontSize: "8pt"}}
                                aria-label="british (1 item)">british</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/company/"
                                className="tag-cloud-link tag-link-32 tag-link-position-3" style={{fontSize: "16.4pt"}}
                                aria-label="company (2 items)">company</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/computer/"
                                className="tag-cloud-link tag-link-28 tag-link-position-4" style={{fontSize: "8pt"}}
                                aria-label="computer (1 item)">computer</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/developers/"
                                className="tag-cloud-link tag-link-16 tag-link-position-5" style={{fontSize: "8pt"}}
                                aria-label="developers (1 item)">developers</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/django/"
                                className="tag-cloud-link tag-link-26 tag-link-position-6" style={{fontSize: "8pt"}}
                                aria-label="django (1 item)">django</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/employee/"
                                className="tag-cloud-link tag-link-30 tag-link-position-7" style={{fontSize: "8pt"}}
                                aria-label="employee (1 item)">employee</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/employer/"
                                className="tag-cloud-link tag-link-29 tag-link-position-8" style={{fontSize: "8pt"}}
                                aria-label="employer (1 item)">employer</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/english/"
                                className="tag-cloud-link tag-link-36 tag-link-position-9" style={{fontSize: "22pt"}}
                                aria-label="english (3 items)">english</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/facebook/"
                                className="tag-cloud-link tag-link-33 tag-link-position-10" style={{fontSize: "8pt"}}
                                aria-label="facebook (1 item)">facebook</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/french/"
                                className="tag-cloud-link tag-link-31 tag-link-position-11" style={{fontSize: "8pt"}}
                                aria-label="french (1 item)">french</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/google/"
                                className="tag-cloud-link tag-link-35 tag-link-position-12" style={{fontSize: "16.4pt"}}
                                aria-label="google (2 items)">google</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/interview/"
                                className="tag-cloud-link tag-link-34 tag-link-position-13" style={{fontSize: "8pt"}}
                                aria-label="interview (1 item)">interview</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/javascript/"
                                className="tag-cloud-link tag-link-27 tag-link-position-14" style={{fontSize: "8pt"}}
                                aria-label="javascript (1 item)">javascript</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/language/"
                                className="tag-cloud-link tag-link-25 tag-link-position-15" style={{fontSize: "22pt"}}
                                aria-label="language (3 items)">language</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/life/"
                                className="tag-cloud-link tag-link-14 tag-link-position-16" style={{fontSize: "8pt"}}
                                aria-label="life (1 item)">life</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/php/"
                                className="tag-cloud-link tag-link-24 tag-link-position-17" style={{fontSize: "8pt"}}
                                aria-label="php (1 item)">php</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/programmer/"
                                className="tag-cloud-link tag-link-15 tag-link-position-18" style={{fontSize: "8pt"}}
                                aria-label="programmer (1 item)">programmer</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/programs/"
                                className="tag-cloud-link tag-link-12 tag-link-position-19" style={{fontSize: "16.4pt"}}
                                aria-label="programs (2 items)">programs</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/salary/"
                                className="tag-cloud-link tag-link-17 tag-link-position-20" style={{fontSize: "8pt"}}
                                aria-label="salary (1 item)">salary</a><a
                                href="https://2code.info/demo/themes/Discy/Main/question-tag/university/"
                                className="tag-cloud-link tag-link-13 tag-link-position-21" style={{fontSize: "8pt"}}
                                aria-label="university (1 item)">university</a></div>
                        </section>
                    </div>
                </div>
            </aside>
        )
    }

}