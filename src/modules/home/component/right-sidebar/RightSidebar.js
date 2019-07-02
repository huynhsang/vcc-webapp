import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import type {Filter} from "../../../../global/Filter";
import FilterBuilder from "../../../../global/Filter";
import type {User} from "../../../../domain/User";
import type {Question} from "../../../../domain/Question";
import type {SubCategory} from "../../../../domain/SubCategory";

const propTypes = {
    getTopUsers: PropTypes.func.isRequired,
    getTopPopularQuestions: PropTypes.func.isRequired,
    getQuestionsWithTopAnswers: PropTypes.func.isRequired,
    getTopTrendingTags: PropTypes.func.isRequired,
};
export default class RightSidebar extends BasicComponent{
    topUsersFilter: Filter = FilterBuilder.buildPaginationFilter(null, 0, 5);
    popularQuestionsFilter: Filter = FilterBuilder.buildPaginationFilter(null, 0, 5);
    qaFilter: Filter = FilterBuilder.buildPaginationFilter(null, 0, 5);
    trendingTagsFilter: Filter = FilterBuilder.buildPaginationFilter(null, 0, 5);

    constructor(props) {
        super(props);
        this.state = {
            topUsers: [],
            popularQuestions: [],
            questionsWithTopAnswers: [],
            trendingTags: [],
            isPopularTab: true,
        };
        props.getTopUsers(this.topUsersFilter, this);
        props.getTopPopularQuestions(this.popularQuestionsFilter, this);
        props.getQuestionsWithTopAnswers(this.qaFilter, this);
        props.getTopTrendingTags(this.trendingTagsFilter, this);
    }

    toggleQuestionTabs(value) {
      this.changeStateValue("isPopularTab", value);
    }

    render() {
        const { topUsers, popularQuestions, questionsWithTopAnswers, trendingTags } = this.state;
        const popularClassName = this.state.isPopularTab ? "tab current" : "tab";
        const answerClassName = this.state.isPopularTab ? "tab" : "tab current";
        const questions: Array<Question> = this.state.isPopularTab ? popularQuestions : questionsWithTopAnswers;
        return (
            <aside className="sidebar sidebar-width float_l fixed-sidebar"
                   style={{position: "relative", overflow: "visible", boxSizing: "border-box", minHeight: "1px"}}>
                <div className="theiaStickySidebar"
                     style={{paddingTop: "0px", paddingBottom: "1px", position: "static", top: "0px", left: "1026px"}}>
                    <h3 className="screen-reader-text">Sidebar</h3>
                    <div className="inner-sidebar">
                        <div className="widget widget_ask">
                            <Link to="/question/add" className="button-default wpqa-question">
                                Ask A Question
                            </Link>
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
                                    <li className={popularClassName}>
                                        <a onClick={() => this.toggleQuestionTabs(true)}>Popular</a>
                                    </li>
                                    <li className={answerClassName}>
                                        <a onClick={() => this.toggleQuestionTabs(false)}>Answers</a>
                                    </li>
                                </ul>
                                <div className="clearfix"/>
                            </div>
                            <div className="widget-wrap">
                                <div className="widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab"
                                     style={{display: "block"}}>
                                    <div className="user-notifications user-profile-area">
                                        <div>
                                            <ul>
                                                {
                                                    questions.map((question: Question, index) => {
                                                        const askedBy: User = question.askedBy;
                                                        return (
                                                            <li key={index} className="widget-posts-text widget-no-img">
                                                                <span className="span-icon">
                                                                    <Link to={`/user/${askedBy.id}`}>
                                                                        <img className="avatar avatar-20 photo" alt={`${askedBy.firstName} ${askedBy.lastName}`} width="20" height="20" src={askedBy.avatar}/>
                                                                    </Link>
                                                                </span>
                                                                <div>
                                                                    <h3>
                                                                        <Link to={`/question/${question.id}/view`} title={question.title}>
                                                                            {question.title}
                                                                        </Link>
                                                                    </h3>
                                                                    <ul className="widget-post-meta">
                                                                        <li>
                                                                            <Link to={`/question/${question.id}/view`} className="post-meta-comment">
                                                                                <i className="icon-comment"/>{question.numberOfAnswers} Answers
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
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
                            <h2 className="widget-title">
                                <i className="icon-folder"/>Top Members
                            </h2>
                            <div className="widget-wrap">
                                <div className="user-section user-section-small row user-not-normal">
                                    {
                                        topUsers.map((user: User, index) => {
                                            return (
                                                <div key={index} className="col col12">
                                                    <div className="post-section user-area user-area-small">
                                                        <div className="post-inner">
                                                            <div className="author-image author-image-42">
                                                                <Link to={`/user/${user.id}`}>
                                                                    <span className="author-image-span">
                                                                        <img className="avatar avatar-42 photo" alt="" title="" width="42" height="42" src={user.avatar}/>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="user-content">
                                                                <div className="user-inner">
                                                                    <h4>
                                                                        <Link to={`/user/${user.id}`}>
                                                                            {user.firstName} {user.lastName}
                                                                        </Link>
                                                                    </h4>
                                                                    <div className="user-data">
                                                                        <ul>
                                                                            <li className="user-questions">
                                                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/marko/questions/">
                                                                                    {user.numberOfQuestions} Questions
                                                                                </a>
                                                                            </li>
                                                                            <li className="user-points">
                                                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/marko/points/">
                                                                                    {user.points} Points
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <span className="badge-span" style={{backgroundColor: "#d9a34a"}}>
                                                                        {user.level}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="clearfix"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                        <section id="tag_cloud-2" className="widget widget_tag_cloud">
                            <h2 className="widget-title">
                                <i className="icon-folder"/>Trending Tags
                            </h2>
                            <div className="tagcloud">
                                {
                                    trendingTags.map((tag: SubCategory, index) => {
                                        return (
                                            <Link key={index} to={`/questions?tags=${tag.slug}`} className="tag-cloud-link tag-link-11 tag-link-position-1">
                                                analytics
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </aside>
        )
    }
}
RightSidebar.propTypes = propTypes;