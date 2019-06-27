import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import type {Filter} from "../../../../global/Filter";
import FilterBuilder from "../../../../global/Filter";
import type {User} from "../../../../domain/User";
import type {Question} from "../../../../domain/Question";
import type {Category} from "../../../../domain/Category";
import type {SubCategory} from "../../../../domain/SubCategory";

const propTypes = {
    getQuestions: PropTypes.func.isRequired
};
export default class MainPage extends BasicComponent {
    filter: Filter = FilterBuilder.buildPaginationFilter('updated DESC', 0, 10);

    constructor(props) {
        super(props);
        this.state = {questions: []};
    }
    handleBeforeTheFirstRender(): void {
        const params = new URLSearchParams(this.props.location.search);
        this.props.getQuestions(this.filter, params.get('show'), this);
    }

    render() {
        const questions = this.state.questions;
        return (
            <div className="discy-main-inner float_l">
                <div className="clearfix"/>
                <div id="row-tabs-home" className="row row-tabs">
                    <div className="col col12">
                        <div className="wrap-tabs">
                            <div className="menu-tabs active-menu">
                                <ul className="menu flex">
                                    <li className="active-tab">
                                        <Link to="?show=recent-questions">Recent Questions</Link>
                                    </li>
                                    <li>
                                        <Link to="?show=most-answered">Most Answered</Link>
                                    </li>
                                    <li>
                                        <Link to="?show=most-visited">Most Visited</Link>
                                    </li>
                                    <li className="flexMenu-viewMore">
                                        <a title="">
                                            <i className="icon-dot-3"/>
                                        </a>
                                        <ul className="flexMenu-popup" style={{display: "none", position: "absolute"}}>
                                            <Link to="?show=most-voted">Most Voted</Link>
                                            <Link to="?show=no-answers">No Answers</Link>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    <h2 className="screen-reader-text">VC&C Latest Questions</h2>
                    <div className="post-articles question-articles">
                        <article id="post-118" className="article-question article-post clearfix question-vote-image question-type-normal post-118 question type-question status-publish hentry question-category-language question_tags-english question_tags-language">
                            <div className="question-sticky-ribbon">
                                <div>Pinned</div>
                            </div>
                            <div className="single-inner-content">
                                <div className="question-inner">
                                    <div className="question-image-vote">
                                        <div className="author-image author-image-42">
                                            <Link to="/question/who-am-i/view">
                                                <span className="author-image-span">
                                                    <img className="avatar avatar-42 photo" alt="Martin Hope" title="Martin Hope" width="42" height="42" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg"/>
                                                </span>
                                            </Link>
                                            <div className="author-image-pop-2">
                                                <div className="post-section user-area user-area-columns_pop">
                                                    <div className="post-inner">
                                                        <div className="author-image author-image-70">
                                                            <Link to="/question/who-am-i/view">
                                                                <span className="author-image-span">
                                                                    <img className="avatar avatar-70 photo" alt="" title="" width="70" height="70" src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg"/>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className="user-content">
                                                            <div className="user-inner">
                                                                <div className="user-data-columns">
                                                                    <h4>
                                                                        <Link to="/question/who-am-i/view">
                                                                            Martin Hope
                                                                        </Link>
                                                                    </h4>
                                                                    <div className="user-data">
                                                                        <ul>
                                                                            <li className="city-country"><i
                                                                                className="icon-location"/>Damita,
                                                                                Egypt
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="user-columns-data">
                                                            <ul>
                                                                <li className="user-columns-questions"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/martin/questions/"><i
                                                                    className="icon-book-open"/>3 Questions</a></li>
                                                                <li className="user-columns-answers"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/martin/answers/"><i
                                                                    className="icon-comment"/>7 Answers</a></li>
                                                                <li className="user-columns-best-answers"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/martin/best-answers/"><i
                                                                    className="icon-graduation-cap"/>0 Best
                                                                    Answers</a></li>
                                                                <li className="user-columns-points"><a
                                                                    href="https://2code.info/demo/themes/Discy/Main/profile/martin/points/"><i
                                                                    className="icon-bucket"/>184 Points</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="user-follow-profile"><a
                                                            href="https://2code.info/demo/themes/Discy/Main/profile/martin/">View
                                                            Profile</a></div>
                                                        <div className="clearfix"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="question-vote question-mobile">
                                            <li className="question-vote-up"><a
                                                href="https://2code.info/demo/themes/Discy/Main/#"
                                                id="question_vote_up-118" data-type="question" data-vote-type="up"
                                                className="wpqa_vote question_vote_up vote_allow" title="Like"><i
                                                className="icon-up-dir"/></a></li>
                                            <li className="vote_result" itemProp="upvoteCount">68</li>
                                            <li className="li_loader"><span className="loader_3 fa-spin"/></li>
                                            <li className="question-vote-down"><a
                                                href="https://2code.info/demo/themes/Discy/Main/#"
                                                id="question_vote_down-118" data-type="question" data-vote-type="down"
                                                className="wpqa_vote question_vote_down vote_allow" title="Dislike"><i
                                                className="icon-down-dir"/></a></li>
                                        </ul>
                                    </div>
                                    <div className="question-content question-content-first">
                                        <header className="article-header">
                                            <div className="question-header">
                                                <Link to="/question/who-am-i/view" className="post-author" itemProp="url">
                                                    Martin Hope
                                                </Link>
                                                <span className="badge-span" style={{backgroundColor: "#30a96f"}}>Explainer</span>
                                                <div className="post-meta"><span className="post-date"
                                                                                 itemProp="dateCreated"
                                                                                 dateTime="April 19, 2018">Asked<span
                                                    className="date-separator">:</span>
                                                                    <a href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/"
                                                                       itemProp="url">
                                                                        <time className="entry-date published"
                                                                              dateTime="2018-04-19T02:00:31+00:00">April 19, 2018</time>
                                                                    </a>
                                                                    </span><span className="byline"><span
                                                    className="post-cat">In: <a
                                                    href="https://2code.info/demo/themes/Discy/Main/question-category/language/"
                                                    rel="tag">Language</a></span></span>
                                                </div>
                                            </div>
                                        </header>
                                        <div>
                                            <h2 className="post-title"><a className="post-title"
                                                                          href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/"
                                                                          rel="bookmark">Is this statement, “i see him
                                                last night” can be understood as “I saw him last night”?</a></h2></div>
                                    </div>
                                    <div className="question-not-mobile question-image-vote question-vote-sticky">
                                        <div className="">
                                            <ul className="question-vote">
                                                <li className="question-vote-up"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/#"
                                                    id="question_vote_up-118" data-type="question" data-vote-type="up"
                                                    className="wpqa_vote question_vote_up vote_allow" title="Like"><i
                                                    className="icon-up-dir"/></a></li>
                                                <li className="vote_result" itemProp="upvoteCount">68</li>
                                                <li className="li_loader"><span className="loader_3 fa-spin"/>
                                                </li>
                                                <li className="question-vote-down"><a
                                                    href="https://2code.info/demo/themes/Discy/Main/#"
                                                    id="question_vote_down-118" data-type="question"
                                                    data-vote-type="down"
                                                    className="wpqa_vote question_vote_down vote_allow" title="Dislike"><i
                                                    className="icon-down-dir"/></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="question-content question-content-second">
                                        <div className="post-wrap-content">
                                            <div className="question-content-text">
                                                <div className="all_not_signle_question_content">
                                                    <p>In my local language (Bahasa Indonesia) there are no verb-2 or
                                                        past tense form as time tracker. So, I often forget to use the
                                                        past form of verb when speaking english. I saw him last night
                                                        (correct) I see him last night ...</p>
                                                </div>
                                            </div>
                                            <div className="tagcloud">
                                                <div className="question-tags"><i className="icon-tags"/><a
                                                    href="https://2code.info/demo/themes/Discy/Main/question-tag/english/">english</a><a
                                                    href="https://2code.info/demo/themes/Discy/Main/question-tag/language/">language</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wpqa_error"/>
                                        <footer className="question-footer">
                                            <ul className="footer-meta">
                                                <li className="best-answer-meta"><i className="icon-comment"/><a
                                                    href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comments">4</a>
                                                    <span className="question-span"><a
                                                        href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comments">Answers</a></span>
                                                </li>
                                                <li className="view-stats-meta"><i className="icon-eye"/>3038 <span
                                                    className="question-span">Views</span></li>
                                            </ul>
                                            <a className="meta-answer"
                                               href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#respond">Answer</a>
                                        </footer>
                                    </div>
                                    <div className="clearfix"/>
                                </div>
                            </div>
                        </article>

                        {
                            questions.map((question: Question, index) => {
                                const askedBy: User = question.askedBy;
                                const category: Category = question.category;
                                const subCategories: Array<SubCategory> = JSON.parse(question.tags);
                                const bestAnswerClassName = question.hasAcceptedAnswer ? "best-answer-meta meta-best-answer" : "best-answer-meta";
                                return (
                                    <article key={index} className="article-question article-post clearfix question-vote-image question-type-normal post-118 question type-question status-publish hentry question-category-language question_tags-english question_tags-language">
                                        <div className="question-sticky-ribbon">
                                            <div>Pinned</div>
                                        </div>
                                        <div className="single-inner-content">
                                            <div className="question-inner">
                                                <div className="question-image-vote">
                                                    <div className="author-image author-image-42">
                                                        <Link to={`/user/${askedBy.id}`}>
                                                            <span className="author-image-span">
                                                                <img className="avatar avatar-42 photo" alt="Martin Hope" title="Martin Hope" width="42" height="42" src={askedBy.avatar}/>
                                                            </span>
                                                        </Link>
                                                        <div className="author-image-pop-2">
                                                            <div className="post-section user-area user-area-columns_pop">
                                                                <div className="post-inner">
                                                                    <div className="author-image author-image-70">
                                                                        <Link to={`/user/${askedBy.id}`}>
                                                                            <span className="author-image-span">
                                                                                <img className="avatar avatar-70 photo" alt="" title="" width="70" height="70" src={askedBy.avatar}/>
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="user-content">
                                                                        <div className="user-inner">
                                                                            <div className="user-data-columns">
                                                                                <h4>
                                                                                    <Link to={`/user/${askedBy.id}`}>
                                                                                        {`${askedBy.firstName} ${askedBy.lastName}`}
                                                                                    </Link>
                                                                                </h4>
                                                                                <div className="user-data">
                                                                                    <ul>
                                                                                        <li className="city-country">
                                                                                            <i className="icon-location"/>
                                                                                            Da nang, Viet Nam
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-columns-data">
                                                                        <ul>
                                                                            <li className="user-columns-questions">
                                                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/questions/">
                                                                                    <i className="icon-book-open"/>
                                                                                    {askedBy.numberOfQuestions} Questions
                                                                                </a>
                                                                            </li>
                                                                            <li className="user-columns-answers">
                                                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/answers/">
                                                                                    <i className="icon-comment"/>
                                                                                    {askedBy.numberOfAnswers} Answers
                                                                                </a>
                                                                            </li>
                                                                            <li className="user-columns-best-answers">
                                                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/best-answers/">
                                                                                    <i className="icon-graduation-cap"/>
                                                                                    {askedBy.numberOfBestAnswers} Best Answers
                                                                                </a>
                                                                            </li>
                                                                            <li className="user-columns-points">
                                                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/points/">
                                                                                    <i className="icon-bucket"/>
                                                                                    {askedBy.points} Points
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="user-follow-profile">
                                                                        <Link to={`/user/${askedBy.id}`}>
                                                                            View Profile
                                                                        </Link>
                                                                    </div>
                                                                    <div className="clearfix"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul className="question-vote question-mobile">
                                                        <li className="question-vote-up">
                                                            <button className="wpqa_vote question_vote_up vote_allow" title="Like">
                                                                <i className="icon-up-dir"/>
                                                            </button>
                                                        </li>
                                                        <li className="vote_result" itemProp="upvoteCount">
                                                            {question.numberOfVotes}
                                                            </li>
                                                        <li className="li_loader">
                                                            <span className="loader_3 fa-spin"/>
                                                        </li>
                                                        <li className="question-vote-down">
                                                            <button className="wpqa_vote question_vote_down vote_allow" title="Dislike">
                                                                <i className="icon-down-dir"/>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="question-content question-content-first">
                                                    <header className="article-header">
                                                        <div className="question-header">
                                                            <Link to={`/user/${askedBy.id}`} className="post-author" itemProp="url">
                                                                {`${askedBy.firstName} ${askedBy.lastName}`}
                                                            </Link>
                                                            <span className="badge-span" style={{backgroundColor: "#30a96f"}}>
                                                                Explainer
                                                            </span>
                                                            <div className="post-meta">
                                                                <span className="post-date">
                                                                    Asked
                                                                    <span className="date-separator">:</span>
                                                                    <Link to={`/question/${question.id}/view`} itemProp="url">
                                                                        <time className="entry-date published" dateTime={question.created}>
                                                                            {` ${new Date(question.created).toDateString()}`}
                                                                        </time>
                                                                    </Link>
                                                                </span>
                                                                <span className="byline">
                                                                    <span className="post-cat">
                                                                        In:
                                                                        <Link to={`/community/${category.slug}`} rel="tag">
                                                                            {category.nameEn}
                                                                        </Link>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </header>
                                                    <div>
                                                        <h2 className="post-title">
                                                            <Link to={`/question/${question.id}/view`} className="post-title">
                                                                {question.title}
                                                            </Link>
                                                        </h2>
                                                    </div>
                                                </div>
                                                <div className="question-not-mobile question-image-vote question-vote-sticky">
                                                    <div>
                                                        <ul className="question-vote">
                                                            <li className="question-vote-up">
                                                                <button className="wpqa_vote question_vote_up vote_allow" title="Like">
                                                                    <i className="icon-up-dir"/>
                                                                </button>
                                                            </li>
                                                            <li className="vote_result" itemProp="upvoteCount">{` ${question.numberOfVotes}`}</li>
                                                            <li className="li_loader">
                                                                <span className="loader_3 fa-spin"/>
                                                            </li>
                                                            <li className="question-vote-down">
                                                                <button className="wpqa_vote question_vote_down vote_allow" title="Dislike">
                                                                    <i className="icon-down-dir"/>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="question-content question-content-second">
                                                    <div className="post-wrap-content">
                                                        <div className="question-content-text">
                                                            <div className="all_not_signle_question_content">
                                                                <p>{question.body}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tagcloud">
                                                            <div className="question-tags">
                                                                <i className="icon-tags"/>
                                                                {
                                                                    subCategories.map((subCategory, count) => {
                                                                        return (
                                                                            <Link key={count} to={`/comunity/${subCategory.slug}`}>{subCategory.nameEn}</Link>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="wpqa_error"/>
                                                    <footer className="question-footer">
                                                        <ul className="footer-meta">
                                                            <li className={bestAnswerClassName}>
                                                                <i className="icon-comment"/>
                                                                <Link to={`/question/${question.id}/view/#answers`}>{`${question.numberOfAnswers} `}</Link>
                                                                <span className="question-span">
                                                                    <Link to={`/question/${question.id}/view/#answers`}>Answers</Link>
                                                                </span>
                                                            </li>
                                                            <li className="view-stats-meta">
                                                                <i className="icon-eye"/>{`${question.numberOfViews} `}
                                                                <span className="question-span">Views</span>
                                                            </li>
                                                        </ul>
                                                        <Link to={`/question/${question.id}/view`} className="meta-answer">Answer</Link>
                                                    </footer>
                                                </div>
                                                <div className="clearfix"/>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </div>
                    <div className="pagination-wrap pagination-question">
                        <div className="pagination-nav posts-load-more">
                            <span className="load_span">
                                <span className="loader_2"/>
                            </span>
                            <div className="load-more">
                                <a>Load More Questions</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
MainPage.prototypes = propTypes;